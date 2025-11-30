// modules/products/service.js
// Ürün iş mantığı

const Product = require('./model');
const slugify = require('slugify');

function makeSlug(name) {
  return slugify(name, {
    lower: true,
    strict: true,
    locale: 'tr',
  });
}

async function createProduct(ownerId, data) {
  const slug = data.slug || makeSlug(data.name);

  const exist = await Product.findOne({ slug });
  if (exist) {
    const err = new Error('Bu ürün için slug zaten kullanımda.');
    err.status = 400;
    throw err;
  }

  const product = await Product.create({
    ...data,
    slug,
    owner: ownerId,
  });

  return product;
}

async function updateProduct(ownerId, productId, data, isAdmin = false) {
  const product = await Product.findById(productId);

  if (!product || product.isDeleted) {
    const err = new Error('Ürün bulunamadı.');
    err.status = 404;
    throw err;
  }

  // satıcı sadece kendi ürününü güncelleyebilir
  if (!isAdmin && product.owner.toString() !== ownerId.toString()) {
    const err = new Error('Bu ürünü güncelleme yetkiniz yok.');
    err.status = 403;
    throw err;
  }

  if (data.name && !data.slug) {
    data.slug = makeSlug(data.name);
  }

  Object.assign(product, data);
  await product.save();

  return product;
}

async function softDeleteProduct(ownerId, productId, isAdmin = false) {
  const product = await Product.findById(productId);

  if (!product || product.isDeleted) {
    const err = new Error('Ürün bulunamadı.');
    err.status = 404;
    throw err;
  }

  if (!isAdmin && product.owner.toString() !== ownerId.toString()) {
    const err = new Error('Bu ürünü silme yetkiniz yok.');
    err.status = 403;
    throw err;
  }

  product.isDeleted = true;
  product.isActive = false;
  await product.save();

  return true;
}

async function getProductById(id) {
  return Product.findOne({ _id: id, isDeleted: false, isActive: true }).populate(
    ['owner', 'category', 'supplier']
  );
}

async function listProducts({ category, search, page = 1, limit = 20 }) {
  const filter = {
    isDeleted: false,
    isActive: true,
  };

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.$text = { $search: search };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [items, total] = await Promise.all([
    Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Product.countDocuments(filter),
  ]);

  return {
    items,
    total,
    page: Number(page),
    limit: Number(limit),
    pages: Math.ceil(total / Number(limit)),
  };
}

async function listSellerProducts(ownerId) {
  return Product.find({
    owner: ownerId,
    isDeleted: false,
  }).sort({ createdAt: -1 });
}

async function updateStock(productId, diff) {
  const product = await Product.findById(productId);
  if (!product) {
    const err = new Error('Ürün bulunamadı.');
    err.status = 404;
    throw err;
  }

  product.stock = (product.stock || 0) + diff;
  if (product.stock < 0) product.stock = 0;

  await product.save();
  return product;
}

module.exports = {
  createProduct,
  updateProduct,
  softDeleteProduct,
  getProductById,
  listProducts,
  listSellerProducts,
  updateStock,
};

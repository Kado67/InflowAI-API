// modules/products/controller.js
// HTTP isteklerini karşılayan katman

const productService = require('./service');

async function createProduct(req, res) {
  try {
    const product = await productService.createProduct(req.user.id, req.body);

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.error('CREATE PRODUCT ERROR:', err);
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Ürün oluşturulurken hata oluştu.',
    });
  }
}

async function updateProduct(req, res) {
  try {
    const isAdmin = req.user.role === 'admin';

    const product = await productService.updateProduct(
      req.user.id,
      req.params.productId,
      req.body,
      isAdmin
    );

    return res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.error('UPDATE PRODUCT ERROR:', err);
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Ürün güncellenirken hata oluştu.',
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const isAdmin = req.user.role === 'admin';

    await productService.softDeleteProduct(
      req.user.id,
      req.params.productId,
      isAdmin
    );

    return res.json({
      success: true,
      message: 'Ürün silindi (pasif hale getirildi).',
    });
  } catch (err) {
    console.error('DELETE PRODUCT ERROR:', err);
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Ürün silinirken hata oluştu.',
    });
  }
}

async function getProduct(req, res) {
  try {
    const product = await productService.getProductById(req.params.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Ürün bulunamadı.',
      });
    }

    return res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.error('GET PRODUCT ERROR:', err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function listProducts(req, res) {
  try {
    const { category, search, page, limit } = req.query;

    const result = await productService.listProducts({
      category,
      search,
      page,
      limit,
    });

    return res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error('LIST PRODUCTS ERROR:', err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function listSellerProducts(req, res) {
  try {
    const items = await productService.listSellerProducts(req.user.id);

    return res.json({
      success: true,
      data: items,
    });
  } catch (err) {
    console.error('LIST SELLER PRODUCTS ERROR:', err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  listProducts,
  listSellerProducts,
};

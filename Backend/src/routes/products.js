const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProduct } = require('../middleware/validation');

// GET /products: Fetch all products
router.get('/', productController.getAllProducts);

// POST /products: Add a new product
router.post('/', validateProduct, productController.createProduct);

// PUT /products/:id: Update product details
router.put('/:id', validateProduct, productController.updateProduct);

// DELETE /products/:id: Remove a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;

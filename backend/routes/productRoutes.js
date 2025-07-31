import { Router } from 'express';
const router = Router();
import Product from '../models/Product.js';
import {protect} from '../middleware/authMiddleware.js';

// Create a product (admin only)
router.post('/', protect, async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save product' });
  }
});

// Get all products
router.get('/', protect, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Delete product
// router.delete('/:id', protect, async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Product deleted' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete product' });
//   }
// });

router.delete('/:id', protect, async (req, res) => {
  try {
    console.log('🧪 Deleting product with ID:', req.params.id);

    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting product:', err.message);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Update product
router.put('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});



export default router;


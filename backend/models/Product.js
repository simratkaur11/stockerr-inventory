import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  category: String,
  SKU: String,
  price: Number,
  stock: Number,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model('Product', productSchema);

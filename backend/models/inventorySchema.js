import mongoose from "mongoose";

const inventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, default: 0 },
  threshold: { type: Number, default: 5 },
  expiryDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default inventoryItemSchema;

import mongoose, { Schema, Document } from "mongoose";

export interface IInventoryItem extends Document {
  userId: string;
  goodId: string;
  name: string;
  quantity: number;
  price: number;
  threshold: number;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const InventoryItemSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    goodId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    threshold: { type: Number, default: 5 },
    expiryDate: { type: Date },
  },
  { timestamps: true }
);

// Create a compound index on userId and goodId to ensure uniqueness
InventoryItemSchema.index({ userId: 1, goodId: 1 }, { unique: true });

// Use existing model or create a new one
export default mongoose.models.InventoryItem ||
  mongoose.model<IInventoryItem>("InventoryItem", InventoryItemSchema);

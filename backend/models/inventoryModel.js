import mongoose from "mongoose";
import inventoryItemSchema from "./inventorySchema.js";

const Inventory = mongoose.model("Inventory", inventoryItemSchema);

export default Inventory;

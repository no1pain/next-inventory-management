import express from "express";
import User from "../models/userSchema.js";
import mongoose from "mongoose";

const router = express.Router();

const verifyUser = async (req, res, next) => {
  try {
    const userId = req.body.userId || req.query.userId;

    if (!userId) {
      return res.status(401).json({ message: "User ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

router.get("/", verifyUser, async (req, res) => {
  try {
    const { user } = req;
    res.status(200).json({ items: user.inventory || [] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching inventory", error: error.message });
  }
});

router.post("/", verifyUser, async (req, res) => {
  try {
    const { user } = req;
    const { name, quantity, price, threshold, expiryDate } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Product name is required" });
    }

    const newItem = {
      name,
      quantity: quantity || 0,
      price: price || 0,
      threshold: threshold || 5,
      expiryDate: expiryDate || null,
      createdAt: new Date(),
    };

    user.inventory.push(newItem);
    await user.save();

    res.status(201).json({
      message: "Item added successfully",
      item: user.inventory[user.inventory.length - 1],
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding inventory item", error: error.message });
  }
});

router.put("/:itemId", verifyUser, async (req, res) => {
  try {
    const { user } = req;
    const { itemId } = req.params;
    const { name, quantity, price, threshold, expiryDate } = req.body;

    const itemIndex = user.inventory.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    if (name) user.inventory[itemIndex].name = name;
    if (quantity !== undefined) user.inventory[itemIndex].quantity = quantity;
    if (price !== undefined) user.inventory[itemIndex].price = price;
    if (threshold !== undefined)
      user.inventory[itemIndex].threshold = threshold;
    if (expiryDate !== undefined)
      user.inventory[itemIndex].expiryDate = expiryDate;

    await user.save();

    res.status(200).json({
      message: "Item updated successfully",
      item: user.inventory[itemIndex],
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating inventory item", error: error.message });
  }
});

router.delete("/:itemId", verifyUser, async (req, res) => {
  try {
    const { user } = req;
    const { itemId } = req.params;

    const itemIndex = user.inventory.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    user.inventory.splice(itemIndex, 1);
    await user.save();

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting inventory item", error: error.message });
  }
});

export default router;

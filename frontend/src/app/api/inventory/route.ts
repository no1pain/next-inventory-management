import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import InventoryItem from "@/models/InventoryItem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET /api/inventory - Get all inventory items for the current user
export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Get the current user from the session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Get all inventory items for the current user
    const items = await InventoryItem.find({ userId });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    return NextResponse.json(
      { error: "Failed to fetch inventory items" },
      { status: 500 }
    );
  }
}

// POST /api/inventory - Create a new inventory item
export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Get the current user from the session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const data = await req.json();

    // Validate required fields
    if (
      !data.goodId ||
      !data.name ||
      data.price === undefined ||
      data.quantity === undefined
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if item already exists for this user
    const existingItem = await InventoryItem.findOne({
      userId,
      goodId: data.goodId,
    });

    if (existingItem) {
      // Update existing item
      existingItem.name = data.name;
      existingItem.quantity = data.quantity;
      existingItem.price = data.price;
      existingItem.threshold = data.threshold || existingItem.threshold;
      existingItem.expiryDate = data.expiryDate || existingItem.expiryDate;

      await existingItem.save();
      return NextResponse.json({ item: existingItem });
    }

    // Create new item
    const newItem = new InventoryItem({
      userId,
      goodId: data.goodId,
      name: data.name,
      quantity: data.quantity,
      price: data.price,
      threshold: data.threshold || 5,
      expiryDate: data.expiryDate,
    });

    await newItem.save();
    return NextResponse.json({ item: newItem }, { status: 201 });
  } catch (error) {
    console.error("Error creating inventory item:", error);
    return NextResponse.json(
      { error: "Failed to create inventory item" },
      { status: 500 }
    );
  }
}

// DELETE /api/inventory - Delete an inventory item
export async function DELETE(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Get the current user from the session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { searchParams } = new URL(req.url);
    const goodId = searchParams.get("goodId");

    if (!goodId) {
      return NextResponse.json(
        { error: "Missing goodId parameter" },
        { status: 400 }
      );
    }

    // Delete the item
    const result = await InventoryItem.deleteOne({ userId, goodId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    return NextResponse.json(
      { error: "Failed to delete inventory item" },
      { status: 500 }
    );
  }
}

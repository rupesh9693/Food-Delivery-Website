import userModel from "../models/userModel.js";

// ✅ Add item to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and Item ID are required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Remove item from user cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and Item ID are required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;

      if (cartData[itemId] === 0) {
        delete cartData[itemId]; // clean up zero quantity items
      }

      await userModel.findByIdAndUpdate(userId, { cartData });

      return res.json({ success: true, message: "Removed from cart" });
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: "Item not in cart or quantity already 0",
        });
    }
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Fetch user cart data
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addToCart, getCart, removeFromCart };

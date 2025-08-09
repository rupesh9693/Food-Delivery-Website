import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized. Please login again.",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach decoded user info to req.user (preferred over modifying req.body)
    req.user = { id: token_decode.id };

    next();
  } catch (error) {
    console.log("Auth error:", error);
    res.json({ success: false, message: "Invalid token. Please login again." });
  }
};

export default authMiddleware;

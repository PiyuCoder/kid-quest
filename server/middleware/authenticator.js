import jwt from "jsonwebtoken";

export const authenticator = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header("Authorization");

  // Check if the token is missing
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);

    // Attach the decoded user information to the request object for later use
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

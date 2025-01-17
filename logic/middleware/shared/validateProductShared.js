const validateProductShared = async (req, res, next) => {
  const { name, quantity, price, description } = req.body;

  if (!name || !quantity || !price || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (typeof quantity !== "number" || typeof price !== "number") {
    return res
      .status(400)
      .json({ message: "Quantity and price must be numbers" });
  }

  if (description.length > 500) {
    return res.status(400).json({ message: "Description is too long" });
  }

  if (quantity < 0 || price < 0) {
    return res
      .status(400)
      .json({ message: "Quantity and price must be positive" });
  }

  next();
};

module.exports = validateProductShared;

// except: nutrints

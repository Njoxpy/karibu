const createFreshOilProduct = async (req, res) => {
  try {
    const { name, description, quantity, price, userId } = req.body;

    if (!name || !description || !quantity || !price || !userId) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "All required fields must be provided." });
    }

    if (isNaN(quantity) || isNaN(price)) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Quantity and price must be valid numbers." });
    }

    if (quantity <= 0 || price <= 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Quantity and price must be greater than zero." });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(BAD_REQUEST).json({ message: "Invalid userId." });
    }

    const image = req.file ? req.file.path : null;
    const newProduct = new FreshOilProduct({
      name,
      description,
      quantity,
      price,
      image,
      userId,
      total: quantity * price,
    });

    const savedProduct = await newProduct.save();
    res.status(CREATED).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: "Error creating product",
      details: error.message,
    });
  }
}; 
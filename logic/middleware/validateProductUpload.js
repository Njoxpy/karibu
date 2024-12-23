// Validate product data
const validateProductUpload = (req, res, next) => {
  const errors = [];

  // Check for missing or invalid fields in product data
  const { name, description, quantity, price, total } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push("Product name is required and should be a string.");
  }

  if (description && typeof description !== 'string') {
    errors.push("Description must be a string.");
  }

  if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
    errors.push("Quantity must be a positive number.");
  }

  if (!price || typeof price !== 'number' || price <= 0) {
    errors.push("Price must be a positive number.");
  }

  if (!total || typeof total !== 'number' || total <= 0) {
    errors.push("Total must be a positive number.");
  }

  // Check if file is uploaded and valid
  if (!req.file) {
    errors.push("Product image is required.");
  } else {
    // Validate the file type and size
    const file = req.file;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      errors.push("Invalid file type. Only JPEG, PNG, and GIF are allowed.");
    }

    const maxSize = 1024 * 1024 * 5; // 5 MB
    if (file.size > maxSize) {
      errors.push("File size exceeds 5 MB.");
    }
  }

  // If there are validation errors, respond with 400 status and error messages
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Proceed to the next middleware or route handler if validation is successful
  next();
};

module.exports = validateProductUpload;

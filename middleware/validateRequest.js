const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().min(0).required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
  userId: Joi.string().required()
});

const orderSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().positive().required(),
  userId: Joi.string().required()
});

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(BAD_REQUEST).json({ 
        message: 'Validation error', 
        details: error.details[0].message 
      });
    }
    next();
  };
};

module.exports = {
  validateProduct: validateRequest(productSchema),
  validateOrder: validateRequest(orderSchema)
}; 
const validateRequestBody = (req, res, next) => {
    const { name, description, quantity, nutrients, price, userId } = req.body;

    
    if (!name || typeof name !== 'string' ) {
        return res.status(400).json({ error: "Name is required and must be a valid string" });
    }

    if (!nutrients || typeof nutrients !== 'string' || nutrients.trim() === '') {
        return res.status(400).json({ error: "Nutrients is required and must be a valid string" });
        
    }
   
    if (!description || typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ error: "Description is required and must be a valid string" });
    }

    if (description.length > 400) {
        return res.status(400).json({error:"Description should not exceed 400 characters"})
    }

   
    if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ error: "Quantity must be a number greater than 0" });
    }

    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: "Price must be a number greater than 0" });
    }

    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({ error: "UserId is required and must be a valid string" });
    }

    next();
}


module.exports = validateRequestBody;
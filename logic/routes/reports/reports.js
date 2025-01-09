const express = require('express');
const router = express.Router();

// Basic reports endpoint
router.get('/reports', (req, res) => {
    const { type, start, end } = req.query;

    // Validate required query parameters
    if (!type || !start || !end) {
        return res.status(400).json({ error: 'Missing required parameters: type, start, or end.' });
    }

    // Temporary response to confirm functionality
    res.json({
        message: 'Reports endpoint is working!',
        type,
        start,
        end,
    });
});

module.exports = router;

const multer = require('multer');
const path = require('path');

// Define the file filter to only accept images
const imageFileFilter = (req, file, cb) => {
    // Accept image formats (e.g., png, jpg, jpeg, gif)
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb(new Error('Only image files are allowed'), false);
    }
};

// Setup storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp/my-image-uploads'); // Adjust path as necessary
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Multer instance with storage and file filter settings
const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Optional: Limit file size to 5MB
}).single('image'); // Use .array('images') if you want to handle multiple images

// Middleware to handle image upload
const imageUploadMiddleware = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                // Multer-specific errors
                return res.status(400).send({ error: err.message });
            } else {
                // Other errors (e.g., file type error)
                return res.status(400).send({ error: err.message });
            }
        }
        // Proceed to the next middleware or route handler
        next();
    });
};

module.exports = imageUploadMiddleware;

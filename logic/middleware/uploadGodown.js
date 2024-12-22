const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure where and how to store the uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(`Uploading file: ${file.originalname}, Mimetype: ${file.mimetype}`);
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            const dir = 'excel/';
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            cb(null, dir);  // Specify the folder to store Excel files
        } else if (file.mimetype === 'text/csv') {
            const dir = 'csv/';
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            cb(null, dir);  // Specify the folder to store CSV files
        } else {
            const dir = 'uploads/';
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            cb(null, dir);  // Specify the folder to store other files (images by default)
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));  // Set a unique file name
    },
});

// File filter to allow only Excel and CSV files
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel files
        'text/csv' // CSV files
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Invalid file type. Only Excel and CSV files are allowed!`), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },  // Max file size: 5 MB
});

module.exports = upload;

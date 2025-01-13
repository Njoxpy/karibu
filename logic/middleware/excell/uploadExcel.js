const multer = require("multer");

// Set up multer storage to handle file uploads in memory
const storage = multer.memoryStorage();

// File filter to allow only Excel files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel", // .xls
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only Excel files are allowed."), false); // Reject the file
  }
};

// Configure multer with the storage and file filter
const uploadExcel = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
  },
});

module.exports = uploadExcel;

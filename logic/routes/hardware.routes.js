const express = require("express")
const multer = require("multer")
const router = express.Router()

// controllers
const { createHardwareOrder, getAllHardwareProducts, getAllHardwareOrders, updateHardwareProduct, updateHardwareOrder, deleteHardwareProduct, deleteHardwareOrder } = require("../controllers/hardware.controller")

// middleware
const validateProductFields = require("../middleware/validateProductFields")
const validateObjectId = require("../middleware/validateObjectId")

const HardwareProduct = require("../models/hardware/productModel")

// error response
const { SERVER_ERROR, CREATED } = require("../constants/responseStatusCode")

// Multer setup for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// add new product
const asyncHandler = require("express-async-handler");

router.post(
    "/products",
    validateProductFields,
    upload.single("image"),
    asyncHandler(async (req, res) => {
        const { name, description, quantity, price, userId } = req.body;
        const thumbnail_image = req.file ? req.file.filename : null;

        try {
            const product = await HardwareProduct.create({
                name,
                description,
                quantity,
                userId,
                price,
                image: thumbnail_image ? `/uploads/${thumbnail_image}` : null,
            });
            res.status(201).json(product);
        } catch (error) {
            if (error.name === "ValidationError") {
                return res.status(400).json({ message: "Validation error", error: error.errors });
            }
            res.status(500).json({ message: "Failed to add product", error: error.message });
        }
    })
);

// bulk upload
router.post("/products/bulk-upload", upload.single("file"), async (req, res) => {

    fs.createReadStream("mauzo.xlsx")
        .on("data", (data) => {
            results.push(data)
        })
        .on("error", (err) => {
            console.log(err)
        })
        .on("end", () => {
            console.log(results);
            console.log("well done!");
        })
    res.json({ message: "add new products, POST new product" })
})

// create order
router.post("/orders", createHardwareOrder)

// get all products
router.get("/products", getAllHardwareProducts)

// get all orders
router.get("/orders", getAllHardwareOrders)

// update product
router.patch("/products/:id", validateObjectId, updateHardwareProduct)

// update order
router.patch("/orders/:id", validateObjectId, updateHardwareOrder)

// delete product
router.delete("/products/:id", validateObjectId, deleteHardwareProduct)

// delete order
router.delete("/orders/:id", validateObjectId, deleteHardwareOrder)

module.exports = router
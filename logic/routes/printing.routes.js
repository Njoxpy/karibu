const express = require("express")
const { createSubmission } = require("../controllers/printing.controllers")
const validatePrintingSubmission = require("../middleware/validatePrintingSubmission")
const router = express.Router()

router.get("/", (req, res) => {
    res.json({ message: "get all printing orders from savarahha printing page" })
})

router.post("/", validatePrintingSubmission, createSubmission)

module.exports = router
const express = require("express")
const { createSubmission, getPrintingSubmission, getPrintingOrders, getSinglePrintingSubmission } = require("../controllers/printing.controller")
const validatePrintingSubmission = require("../middleware/validatePrintingSubmission")
const validateObjectId = require("../middleware/validateObjectId")
const router = express.Router()
const pdf = require("html-pdf")

router.post("/", validatePrintingSubmission, createSubmission)

router.post("/create-pdf", (req, res) => {
    pdf.create("Njox", {}).toFile('me.pdf', (err) => {
        if (err) {
            res.json({ message: err })
        }
        return Promise.resolve()
    })
})

// get all submissions
router.get("/submissions", getPrintingSubmission)

// get all all orders
router.get("/orders", getPrintingOrders)

// get all single submission
router.get("/submissions/:id", validateObjectId, getSinglePrintingSubmission)

module.exports = router
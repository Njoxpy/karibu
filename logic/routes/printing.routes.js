const express = require("express")
const { createSubmission } = require("../controllers/printing.controller")
const validatePrintingSubmission = require("../middleware/validatePrintingSubmission")
const router = express.Router()
const pdf = require("html-pdf")

router.get("/", (req, res) => {
    res.json({ message: "get all printing orders from savarahha printing page" })
})

router.post("/", validatePrintingSubmission, createSubmission)
router.post("/create-pdf", (req, res) => {
    pdf.create("Njox", {}).toFile('me.pdf', (err) => {
        if (err) {
            res.json({ message: err })
        }
        return Promise.resolve()
    })
})

module.exports = router
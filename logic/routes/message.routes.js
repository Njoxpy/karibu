const express = require("express");
const {
  sendMessage,
  getMessages,
  getMessage,
  updateMessage,
  deleteMessage,
} = require("../controllers/Message.controller");
const validateMessage = require("../middleware/validateMessage");
const validateObjectId = require("../middleware/validateObjectId");
const authenticate = require("../middleware/auth/authenticate");
const checkCategory = require("../middleware/auth/checkCategory");
const router = express.Router();

router.post("/", sendMessage);

router.get("/", authenticate, checkCategory(["admin"]), getMessages);

router.get(
  "/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  getMessage,
);

router.put(
  "/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  updateMessage,
);

router.delete(
  "/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  deleteMessage,
);

module.exports = router;

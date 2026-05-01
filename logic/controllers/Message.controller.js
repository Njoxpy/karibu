const {
  NOT_FOUND,
  OK,
  INTERNAL_SERVER_ERROR,
} = require("../constants/responseStatusCode");
const messageModel = require("../models/message/messageModel");
// create

const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log(req.body);

    const contactMessage = await messageModel.create({ name, email, message });

    if (!contactMessage) {
      return res.status(NOT_FOUND).json({ message: "Not found" });
    }

    res.status(OK).json({ message: contactMessage });
  } catch (error) {
    console.error(error.message);

    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

// read
const getMessages = async (req, res) => {
  try {
    const contactMessage = await messageModel.find().sort({ createdAt: -1 });

    if (contactMessage.length === 0) {
      return res.status(NOT_FOUND).json({ message: "No message found" });
    }

    res.status(OK).json({ message: contactMessage });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const contactMessage = await messageModel.findById(id);

    if (!contactMessage) {
      return res.status(NOT_FOUND).json({ message: "Message not found" });
    }

    res.status(OK).json({ message: contactMessage });
  } catch (error) {}
};

// update
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const contactMessage = await messageModel.findByIdAndUpdate(id, {
      new: true,
      runValidators: true,
    });

    if (!contactMessage) {
      return res.status(NOT_FOUND).json({ message: "Message not found" });
    }

    res.status(OK).json({ message: contactMessage });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

// delete
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const contactMessage = await messageModel.findByIdAndDelete(id);

    if (!contactMessage) {
      return res.status(NOT_FOUND).json({ message: "Message not found" });
    }

    res.status(OK).json({ message: contactMessage });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  getMessage,
  deleteMessage,
  updateMessage,
};

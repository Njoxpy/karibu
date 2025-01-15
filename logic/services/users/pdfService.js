const PDFDocument = require("pdfkit");

const fs = require("fs");
const User = require("../../models/user/userModel"); // Adjust the path as needed

const generateUserReport = async (startDate, endDate) => {
  try {
    const users = await User.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).sort({ createdAt: 1 });

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream("UserReport.pdf"));

    doc.fontSize(20).text("User Report", { align: "center" });
    doc.moveDown(2);

    doc
      .fontSize(12)
      .text(`Report Period: ${startDate} to ${endDate}`, { align: "center" });
    doc.moveDown(2);

    // Define column positions
    const userNameX = 50;
    const emailX = 200;
    const createdAtX = 400;

    // Add table headers
    doc.fontSize(12);
    doc.text("User Name", userNameX, doc.y);
    doc.text("Email", emailX, doc.y);
    doc.text("Created At", createdAtX, doc.y);
    doc.moveDown();

    // Add horizontal line
    doc.moveTo(userNameX, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // Add user data
    users.forEach((user) => {
      doc.fontSize(12);
      doc.text(user.name || "N/A", userNameX, doc.y);
      doc.text(user.email || "N/A", emailX, doc.y);
      doc.text(
        user.createdAt ? user.createdAt.toISOString().split("T")[0] : "N/A",
        createdAtX,
        doc.y
      );
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    throw new Error("Error generating user report: " + error.message);
  }
};

module.exports = {
  generateUserReport,
};

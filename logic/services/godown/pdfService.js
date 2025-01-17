const PDFDocument = require("pdfkit");
const moment = require("moment");

const generateGodownPDF = (orders, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // Set response headers for PDF download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=godown-report-${moment().format("YYYY-MM-DD")}.pdf`
  );

  // Pipe the PDF to the response
  doc.pipe(res);

  // Define Gray Color
  const gray = "#808080";

  // Add Main Heading with Gray Background
  doc.rect(50, 20, 500, 40).fill(gray).stroke();
  doc
    .fillColor("white")
    .fontSize(20)
    .font("Helvetica-Bold")
    .text("Godown Sales Report", 50, 30, { align: "center" })
    .moveDown(2);

  // Add Date Range
  const dateRange =
    orders.length > 0
      ? `${moment(orders[0].createdAt).format("MMMM D, YYYY")} – ${moment(
          orders[orders.length - 1].createdAt
        ).format("MMMM D, YYYY")}`
      : "No data available";
  doc
    .fillColor("black")
    .fontSize(12)
    .text(`Report Period: ${dateRange}`, { align: "center" })
    .moveDown(2);

  // Define column positions
  const orderIdX = 50;
  const quantityX = 300;
  const priceX = 400;

  // Add Table Headers with Gray Background
  doc.rect(orderIdX, doc.y, 500, 20).fill(gray).stroke();
  doc
    .fillColor("white")
    .fontSize(12)
    .font("Helvetica-Bold")
    .text("Order ID", orderIdX + 5, doc.y + 5)
    .text("Quantity", quantityX + 5, doc.y + 5)
    .text("Total Price (Tsh)", priceX + 5, doc.y + 5);

  // Add horizontal line below headers
  doc
    .moveTo(orderIdX, doc.y + 25)
    .lineTo(550, doc.y + 25)
    .stroke();
  doc.moveDown(2);

  // Add Orders Data
  let totalRevenue = 0;
  orders.forEach((order) => {
    const orderId = order.orderId || "N/A";
    const quantity = order.quantity || 0;
    const totalPrice = order.totalPrice || 0;

    doc.fillColor("black").font("Helvetica").fontSize(12);
    doc.text(orderId, orderIdX, doc.y, { width: 200, align: "left" });
    doc.text(quantity.toString(), quantityX, doc.y, {
      width: 100,
      align: "right",
    });
    doc.text(totalPrice.toFixed(2), priceX, doc.y, {
      width: 100,
      align: "right",
    });
    doc.moveDown(1.2);

    totalRevenue += totalPrice;
  });

  // Add Summary Section
  doc.moveTo(orderIdX, doc.y).lineTo(550, doc.y).stroke(); // Horizontal line
  doc.moveDown(1.5);

  doc
    .fillColor("black")
    .font("Helvetica-Bold")
    .text("Summary:", orderIdX, doc.y)
    .moveDown(0.5);

  doc
    .font("Helvetica")
    .text(`Total Orders: ${orders.length}`, { align: "left" })
    .text(`Total Revenue: Tsh ${totalRevenue.toFixed(2)}`, { align: "left" });

  // Footer
  doc
    .fontSize(8)
    .fillColor("gray")
    .text(
      `Generated on: ${moment().format("YYYY-MM-DD HH:mm:ss")}`,
      50,
      doc.page.height - 30,
      { align: "center" }
    );

  // Finalize the PDF
  doc.end();
};

module.exports = {
  generateGodownPDF,
};

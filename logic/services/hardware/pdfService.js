const PDFDocument = require("pdfkit");
const moment = require("moment");

const generateHardwarePDF = (orders, res) => {
  const doc = new PDFDocument({ margin: 50 }); // Added margin for better layout

  // Set response headers for PDF download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=hardware-report-${moment().format("YYYY-MM-DD")}.pdf`
  );

  // Pipe the PDF to the response
  doc.pipe(res);

  // Add main heading
  doc
    .fontSize(24)
    .text("Hardware Sales Report", { align: "center" })
    .moveDown(2);

  // Add date range
  if (orders.length > 0) {
    doc
      .fontSize(12)
      .text(
        `Report Period: ${moment(orders[0].createdAt).format("YYYY-MM-DD")} to ${moment(orders[orders.length - 1].createdAt).format("YYYY-MM-DD")}`,
        { align: "center" }
      )
      .moveDown(2);
  }

  // Define column positions
  const productNameX = 50;
  const quantityX = 400;
  const priceX = 500;

  // Add table headers
  doc.fontSize(12);
  doc.text("Product Name", productNameX, doc.y);
  doc.text("Quantity", quantityX, doc.y - 12);
  doc.text("Total Price (Tsh)", priceX, doc.y - 12);
  doc.moveDown();

  // Add horizontal line
  doc.moveTo(productNameX, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown();

  // Add orders data
  let totalRevenue = 0;
  orders.forEach((order) => {
    doc.fontSize(12);

    // Product Name (ensure productName is available or fetched)
    const productName = order.productName || "N/A";
    doc.text(productName, productNameX, doc.y, {
      width: 300,
      align: "left",
      continued: false,
    });

    // Quantity (right-aligned)
    doc.text(order.quantity?.toString() || "0", quantityX, doc.y - 12, {
      align: "right",
      width: 30,
    });

    // Total Price (right-aligned)
    doc.text(order.totalPrice?.toFixed(2) || "0.00", priceX, doc.y - 12, {
      align: "right",
      width: 80,
    });

    doc.moveDown();

    totalRevenue += order.totalPrice || 0;
  });

  // Add horizontal line
  doc.moveTo(productNameX, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown();

  // Add total revenue (right-aligned)
  doc.text(`Total Revenue: Tsh`, 400, doc.y, { continued: true });
  doc.text(totalRevenue.toFixed(2), { align: "right" });

  // Finalize the PDF
  doc.end();
};

module.exports = {
  generateHardwarePDF,
};

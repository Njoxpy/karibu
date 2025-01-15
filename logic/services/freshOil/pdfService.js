const PDFDocument = require("pdfkit");
const moment = require("moment");

const generateFreshOilPDF = (orders, res) => {
  const doc = new PDFDocument();

  // Set response headers for PDF download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=fresh-oil-report-${moment().format("YYYY-MM-DD")}.pdf`
  );

  // Pipe the PDF to the response
  doc.pipe(res);

  // Add title
  doc.fontSize(24)
     .text("Fresh Oil Sales Report", { align: "center" })
     .moveDown(2);

  // Add date range
  if (orders.length > 0) {
    doc.fontSize(12)
       .text(`Report Period: ${moment(orders[0].createdAt).format("YYYY-MM-DD")} to ${moment(orders[orders.length - 1].createdAt).format("YYYY-MM-DD")}`)
       .moveDown(2);
  }

  // Add table headers
  doc.fontSize(14);
  doc.text("Product Name", 50, doc.y);
  doc.text("Quantity", 300, doc.y - 14);
  doc.text("Total Price", 450, doc.y - 14);
  doc.moveDown();

  // Add horizontal line
  doc.moveTo(50, doc.y)
     .lineTo(550, doc.y)
     .stroke();
  doc.moveDown();

  // Add orders data
  let totalRevenue = 0;
  orders.forEach(order => {
    const price = order.price || 0;
    const quantity = order.quantity || 0;
    const totalPrice = price * quantity;

    doc.fontSize(12);
    doc.text(order.productName || "N/A", 50, doc.y);
    doc.text(quantity.toString(), 300, doc.y - 12);
    doc.text(`Tsh ${totalPrice.toFixed(2)}`, 450, doc.y - 12);
    doc.moveDown();
    
    totalRevenue += totalPrice;
  });

  // Add horizontal line
  doc.moveTo(50, doc.y)
     .lineTo(550, doc.y)
     .stroke();
  doc.moveDown();

  // Add total revenue
  doc.fontSize(14)
     .text(`Total Revenue: Tsh ${totalRevenue.toFixed(2)}`, { align: "right" });

  // Finalize the PDF
  doc.end();
};

module.exports = {
  generateFreshOilPDF
};

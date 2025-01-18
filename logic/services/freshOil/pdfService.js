const PDFDocument = require("pdfkit");
const moment = require("moment");

const generateFreshOilPDF = (orders, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // Set response headers for PDF download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=fresh-oil-report-${moment().format("YYYY-MM-DD")}.pdf`
  );

  // Pipe the PDF to the response
  doc.pipe(res);

  // Define Yellow Color
  const yellow = "#FFD700";

  // Add Branding Header with Yellow Background
  doc.rect(50, 20, 500, 40).fill(yellow).stroke();
  doc
    .fillColor("black")
    .fontSize(20)
    .font("Helvetica-Bold")
    .text("Savarrah", 50, 30, { align: "center" })
    .moveDown(1.5);

  // Add Report Title
  doc
    .fillColor("black")
    .fontSize(18)
    .font("Helvetica")
    .text("Fresh Oil Sales Report", { align: "center" })
    .moveDown();

  // Add Date Range
  const dateRange =
    orders.length > 0
      ? `${moment(orders[0].createdAt).format("MMMM D, YYYY")} – ${moment(
          orders[orders.length - 1].createdAt
        ).format("MMMM D, YYYY")}`
      : "No data available";
  doc
    .fontSize(12)
    .text(`Date Range: ${dateRange}`, { align: "center" })
    .moveDown(2);

  // Add Table Header with Yellow Highlight
  doc.fontSize(12).fillColor("black").font("Helvetica-Bold");
  doc
    .rect(50, doc.y - 5, 500, 20)
    .fill(yellow)
    .stroke();
  doc.text("Product Name", 50, doc.y, { width: 200, align: "left" });
  doc.text("Quantity", 250, doc.y, { width: 100, align: "center" });
  doc.text("Total Price", 400, doc.y, { width: 100, align: "right" });

  // Add Horizontal Line
  doc
    .moveTo(50, doc.y + 15)
    .lineTo(550, doc.y + 15)
    .stroke();
  doc.moveDown(1.5);

  // Add Order Details
  let totalRevenue = 0;
  let totalQuantity = 0;

  doc.font("Helvetica");
  orders.forEach((order) => {
    const productName = order.productName || "N/A";
    const quantity = order.quantity || 0;
    const price = order.price || 0;
    const totalPrice = price * quantity;

    doc.text(productName, 50, doc.y, { width: 200, align: "left" });
    doc.text(quantity.toString(), 250, doc.y, { width: 100, align: "center" });
    doc.text(`Tsh ${totalPrice.toFixed(2)}`, 400, doc.y, {
      width: 100,
      align: "right",
    });

    totalRevenue += totalPrice;
    totalQuantity += quantity;
    doc.moveDown(1.2);
  });

  // Add Summary Section with Yellow Highlight
  doc.moveDown(2);
  doc.rect(50, doc.y, 500, 20).fill(yellow).stroke();
  doc
    .fillColor("black")
    .font("Helvetica-Bold")
    .text("Summary:", 50, doc.y + 5, { align: "left" })
    .moveDown(0.5);

  doc
    .fillColor("black")
    .font("Helvetica")
    .text(`Total Products Sold: ${totalQuantity}`, { align: "left" })
    .text(
      `Average Price per Product: Tsh ${(totalRevenue / totalQuantity || 0).toFixed(2)}`,
      { align: "left" }
    )
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
  generateFreshOilPDF,
};

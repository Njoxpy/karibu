const PDFDocument = require("pdfkit");

const generateAnimalFeedingPDF = (orders, res) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=animal_feeding_report.pdf"
  );
  doc.pipe(res);


  doc
    .fillColor("blue")
    .fontSize(30)
    .text("Animal Feeding Sales Report", { align: "center" });
  doc.moveDown(2);

  // Table Headers Section
  const tableTop = doc.y;
  const headerHeight = 20;
  const columnWidths = [250, 100, 100]; 

  doc
    .fillColor("green") 
    .fontSize(12)
    .text("Product Name", 50, tableTop)
    .text("Quantity", 300, tableTop)
    .text("Total Price", 420, tableTop);

  // Draw the horizontal line below the header
  doc
    .moveTo(50, tableTop + headerHeight)
    .lineTo(550, tableTop + headerHeight)
    .stroke();

  // Table Data Rows
  let yPosition = tableTop + headerHeight + 5;
  orders.forEach((order) => {
    // Check if we are approaching the bottom of the page and add a new page
    // if necessary
    if (yPosition > 750) {
      doc.addPage();
      yPosition = 50; // Reset Y position after adding a new page
    }

    // Draw row data with borders around cells
    doc
      .fillColor("black") // Black for table data
      .fontSize(12)
      .text(order.productId.name, 50, yPosition, {
        width: columnWidths[0],
        align: "left",
      })
      .text(order.quantity, 300, yPosition, {
        width: columnWidths[1],
        align: "center",
      })
      .text(`Tsh ${order.total.toFixed(2)}`, 420, yPosition, {
        width: columnWidths[2],
        align: "right",
      });

    // Draw border lines for each row
    doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke(); // Bottom border
    yPosition += 20; // Increase Y position for next row
  });

  // Draw the final horizontal line at the bottom of the table
  doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();

  // Summary Section
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  doc.moveDown(2);
  doc
    .fillColor("green") // Green for the total revenue
    .fontSize(14)
    .text(`Total Revenue: Tsh ${totalRevenue.toFixed(2)}`, { align: "right" });

  // Finalize the PDF and end the stream
  doc.end();
};

module.exports = { generateAnimalFeedingPDF };

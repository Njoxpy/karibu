const PDFDocument = require("pdfkit");

const generateAnimalFeedingPDF = (orders, res, startDate, endDate) => {
  try {
    const doc = new PDFDocument({ margin: 50 });

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=animal_feeding_report.pdf"
    );
    doc.pipe(res);

    // Add header section
    addHeader(doc, startDate, endDate);

    // Add table section
    const tableTop = doc.y;
    const columnWidths = [250, 100, 100];
    addTableHeaders(doc, tableTop, columnWidths);

    // Add table rows
    let yPosition = tableTop + 25; // Start below headers
    orders.forEach((order, index) => {
      if (yPosition > 750) {
        doc.addPage();
        yPosition = 50; // Reset Y position after adding a new page
      }
      addTableRow(doc, order, yPosition, columnWidths, index);
      yPosition += 20; // Increase Y position for next row
    });

    // Draw the final horizontal line at the bottom of the table
    doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();

    // Add summary section
    addSummary(doc, orders);

    // Finalize the PDF and end the stream
    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Error generating PDF" });
  }
};

// Helper function to add the header section
const addHeader = (doc, startDate, endDate) => {
  doc
    .fillColor("#228B22") // Forest green for brand color
    .fontSize(20)
    .text("Savarrah", { align: "center" })
    .moveDown(0.5)
    .fontSize(16)
    .text("Animal Feeding Sales Report", { align: "center" })
    .moveDown(0.5)
    .fontSize(12)
    .fillColor("#2E8B57") // Sea green for subtext
    .text(`Date Range: ${startDate} – ${endDate}`, { align: "center" })
    .moveDown(2);
};

// Helper function to add table headers
const addTableHeaders = (doc, tableTop, columnWidths) => {
  doc
    .fillColor("#228B22") // Forest green for table headers
    .fontSize(12)
    .text("Product Name", 50, tableTop, {
      width: columnWidths[0],
      align: "left",
    })
    .text("Quantity", 300, tableTop, {
      width: columnWidths[1],
      align: "center",
    })
    .text("Total Price", 420, tableTop, {
      width: columnWidths[2],
      align: "right",
    });

  // Draw the horizontal line below the header
  doc
    .moveTo(50, tableTop + 20)
    .lineTo(550, tableTop + 20)
    .strokeColor("#228B22") // Forest green for lines
    .stroke();
};

// Helper function to add a table row
const addTableRow = (doc, order, yPosition, columnWidths, index) => {
  // Alternate row colors for better readability
  doc.fillColor(index % 2 === 0 ? "#F0FFF0" : "#FFFFFF"); // Light green for even rows, white for odd rows
  doc.rect(50, yPosition, 500, 20).fill().fillColor("#2E8B57"); // Sea green for text

  doc
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
  doc
    .moveTo(50, yPosition)
    .lineTo(550, yPosition)
    .strokeColor("#228B22") // Forest green for lines
    .stroke();
};

// Helper function to add the summary section
const addSummary = (doc, orders) => {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalQuantity = orders.reduce((sum, order) => sum + order.quantity, 0);
  const averagePricePerProduct =
    orders.length > 0 ? totalRevenue / totalQuantity : 0;

  doc.moveDown(2);
  doc
    .fillColor("#228B22") // Forest green for summary title
    .fontSize(14)
    .text("Summary:", { underline: true })
    .moveDown(0.5)
    .fillColor("#2E8B57") // Sea green for summary text
    .fontSize(12)
    .text(`Total Products Sold: ${totalQuantity}`, { indent: 20 })
    .text(
      `Average Price per Product: Tsh ${averagePricePerProduct.toFixed(2)}`,
      { indent: 20 }
    )
    .text(`Total Revenue: Tsh ${totalRevenue.toFixed(2)}`, { indent: 20 });
};

module.exports = { generateAnimalFeedingPDF };

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

    // Header Section
    doc
      .fillColor("blue")
      .fontSize(20)
      .text("Savarrah", { align: "center" })
      .moveDown(0.5)
      .fontSize(16)
      .text("Animal Feeding Sales Report", { align: "center" })
      .moveDown(0.5)
      .fontSize(12)
      .fillColor("black")
      .text(`Date Range: ${startDate} – ${endDate}`, { align: "center" });
    doc.moveDown(2);

    // Table Headers Section
    const tableTop = doc.y;
    const headerHeight = 20;
    const columnWidths = [250, 100, 100];

    doc
      .fillColor("green")
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
      .moveTo(50, tableTop + headerHeight)
      .lineTo(550, tableTop + headerHeight)
      .stroke();

    // Table Data Rows
    let yPosition = tableTop + headerHeight + 5;
    orders.forEach((order, index) => {
      if (yPosition > 750) {
        doc.addPage();
        yPosition = 50; // Reset Y position after adding a new page
      }

      // Alternate row colors for better readability
      if (index % 2 === 0) {
        doc.fillColor("#f0f0f0"); // Light gray for even rows
      } else {
        doc.fillColor("#ffffff"); // White for odd rows
      }
      doc.rect(50, yPosition, 500, 20).fill().fillColor("black");

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
      doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke(); // Bottom border
      yPosition += 20; // Increase Y position for next row
    });

    // Draw the final horizontal line at the bottom of the table
    doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();

    // Summary Section
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalQuantity = orders.reduce(
      (sum, order) => sum + order.quantity,
      0
    );
    const averagePricePerProduct =
      orders.length > 0 ? totalRevenue / totalQuantity : 0;

    doc.moveDown(2);
    doc
      .fillColor("black")
      .fontSize(14)
      .text("Summary:", { underline: true })
      .moveDown(0.5)
      .fontSize(12)
      .text(`Total Products Sold: ${totalQuantity}`, { indent: 20 })
      .text(
        `Average Price per Product: Tsh ${averagePricePerProduct.toFixed(2)}`,
        {
          indent: 20,
        }
      )
      .text(`Total Revenue: Tsh ${totalRevenue.toFixed(2)}`, { indent: 20 });

    // Finalize the PDF and end the stream
    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Error generating PDF" });
  }
};

module.exports = { generateAnimalFeedingPDF };

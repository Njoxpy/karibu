const PDFDocument = require("pdfkit");
const moment = require("moment");

const generateGodownPDF = (orders, res) => {
  try {
    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
      bufferPages: true, // Enable multi-page support
      info: {
        Title: `Godown Sales Report - ${moment().format("YYYY-MM-DD")}`,
        Author: "Godown Management System",
        Subject: "Sales Report",
        Keywords: "godown, sales, report",
        CreationDate: new Date(),
      },
    });

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=godown-report-${moment().format("YYYY-MM-DD")}.pdf`
    );

    // Pipe the PDF to the response
    doc.pipe(res);

    // Define gray color scheme
    const colors = {
      primary: "#808080", // Main gray for headers and accents
      secondary: "#A9A9A9", // Lighter gray for secondary elements
      accent: "#F5F5F5", // Light gray for backgrounds
      text: "#2d3436", // Dark gray for text
      border: "#D3D3D3", // Light gray for borders
      white: "#ffffff", // White for contrast
    };

    // Add a subtle background pattern
    addBackgroundPattern(doc, colors);

    // Add header section
    addHeader(doc, colors);

    // Add date range
    const dateRange =
      orders.length > 0
        ? `${moment(orders[0].createdAt).format("MMMM D, YYYY")} – ${moment(
            orders[orders.length - 1].createdAt
          ).format("MMMM D, YYYY")}`
        : "No data available";
    doc
      .fillColor(colors.text)
      .fontSize(12)
      .text(`Report Period: ${dateRange}`, { align: "center" })
      .moveDown(2);

    // Define column positions
    const orderIdX = 50;
    const quantityX = 300;
    const priceX = 400;

    // Add table headers with gray background
    addTableHeaders(doc, orderIdX, quantityX, priceX, colors);

    // Add orders data
    let totalRevenue = 0;
    let yPosition = doc.y + 10; // Start table rows below headers
    let currentPage = 1;

    orders.forEach((order, index) => {
      // Check if we need a new page
      if (yPosition > 700) {
        doc.addPage();
        currentPage++;
        // Add subtle background to new page
        addBackgroundPattern(doc, colors);
        // Add table headers to new page
        addTableHeaders(doc, orderIdX, quantityX, priceX, colors);
        yPosition = 80; // Reset yPosition for new page
      }

      // Add table row
      addTableRow(
        doc,
        order,
        orderIdX,
        quantityX,
        priceX,
        yPosition,
        index,
        colors
      );
      yPosition += 25; // Move to next row

      // Calculate total revenue
      totalRevenue += order.totalPrice || 0;
    });

    // Add summary section
    addSummary(doc, orders.length, totalRevenue, colors);

    // Add footer with page numbers and timestamp
    addFooter(doc, colors);

    // Finalize the PDF
    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Error generating PDF" });
  }
};

// Helper Functions

const addBackgroundPattern = (doc, colors) => {
  // Add a subtle background color to the whole page
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(colors.white);

  // Add a decorative header bar
  doc.rect(0, 0, doc.page.width, 15).fill(colors.primary);

  // Add a decorative footer bar
  doc.rect(0, doc.page.height - 15, doc.page.width, 15).fill(colors.primary);
};

const addHeader = (doc, colors) => {
  // Add main heading with gray background
  doc.rect(50, 20, 500, 40).fill(colors.primary).stroke();
  doc
    .fillColor(colors.white)
    .fontSize(20)
    .font("Helvetica-Bold")
    .text("Godown Sales Report", 50, 30, { align: "center" })
    .moveDown(2);
};

const addTableHeaders = (doc, orderIdX, quantityX, priceX, colors) => {
  // Add table header background with rounded corners
  const headerY = doc.y;
  doc
    .roundedRect(orderIdX, headerY, 500, 25, 3)
    .fillColor(colors.primary)
    .fill()
    .stroke();

  // Add header text
  doc
    .fillColor(colors.white)
    .fontSize(12)
    .font("Helvetica-Bold")
    .text("Order ID", orderIdX + 10, headerY + 7)
    .text("Quantity", quantityX + 10, headerY + 7)
    .text("Total Price (Tsh)", priceX + 10, headerY + 7);

  // Add horizontal line below headers
  doc
    .moveTo(orderIdX, headerY + 27)
    .lineTo(550, headerY + 27)
    .strokeColor(colors.border)
    .stroke();
};

const addTableRow = (
  doc,
  order,
  orderIdX,
  quantityX,
  priceX,
  yPosition,
  index,
  colors
) => {
  // Alternate row backgrounds
  if (index % 2 === 0) {
    doc
      .rect(orderIdX, yPosition, 500, 20)
      .fillColor(colors.accent)
      .fillOpacity(0.3)
      .fill()
      .fillOpacity(1);
  }

  // Add row content
  doc.fillColor(colors.text).fontSize(11).font("Helvetica");

  // Order ID
  doc.text(order.productName || "N/A", orderIdX + 10, yPosition + 5, {
    width: 200,
    align: "left",
  });

  // Quantity
  doc.text((order.quantity || 0).toString(), quantityX + 10, yPosition + 5, {
    width: 100,
    align: "right",
  });

  // Total Price
  doc.text((order.totalPrice || 0).toFixed(2), priceX + 10, yPosition + 5, {
    width: 100,
    align: "right",
  });

  // Add subtle row border
  doc
    .moveTo(orderIdX, yPosition + 20)
    .lineTo(550, yPosition + 20)
    .strokeColor(colors.border)
    .stroke();
};

const addSummary = (doc, totalOrders, totalRevenue, colors) => {
  // Add summary box with shadow effect
  const summaryY = doc.y + 20;
  doc
    .rect(300, summaryY, 250, 80)
    .fillColor(colors.accent)
    .fill()
    .strokeColor(colors.primary)
    .stroke();

  // Add summary content
  doc
    .fillColor(colors.primary)
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("Summary", 320, summaryY + 15);

  // Add summary items
  const summaryItems = [
    { label: "Total Orders:", value: totalOrders.toString() },
    { label: "Total Revenue:", value: `Tsh ${totalRevenue.toFixed(2)}` },
  ];

  doc.fontSize(11).font("Helvetica");

  summaryItems.forEach((item, index) => {
    doc
      .text(item.label, 320, summaryY + 40 + index * 20)
      .text(item.value, 470, summaryY + 40 + index * 20, { align: "right" });
  });
};

const addFooter = (doc, colors) => {
  const pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i);

    // Add page numbers
    doc
      .fillColor(colors.text)
      .fontSize(10)
      .text(`Page ${i + 1} of ${pages.count}`, 50, 750, { align: "center" });

    // Add timestamp and confidentiality notice
    doc
      .fillColor(colors.text)
      .fontSize(8)
      .text(
        `Generated on ${moment().format("YYYY-MM-DD [at] HH:mm")} | CONFIDENTIAL DOCUMENT | FOR INTERNAL USE ONLY`,
        50,
        770,
        { align: "center" }
      );
  }
};

module.exports = {
  generateGodownPDF,
};

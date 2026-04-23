const PDFDocument = require("pdfkit");
const moment = require("moment");

const generateFreshOilPDF = (orders, res, startDate, endDate) => {
  try {
    // Create a new PDF document with better defaults
    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
      bufferPages: true,
      autoFirstPage: true,
      info: {
        Title: `Fresh Oil Sales Report - ${startDate} to ${endDate}`,
        Author: "karibu Management System",
        Subject: "Sales Report",
        Keywords: "fresh oil, sales, report",
        CreationDate: new Date(),
      },
    });

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=fresh_oil_report_${startDate}_to_${endDate}.pdf`,
    );

    // Pipe the PDF to the response
    doc.pipe(res);

    // Define green color scheme
    const colors = {
      primary: "#FFD700", // Dominant yellow (Gold) for main elements
      secondary: "#FFA500", // Orange for secondary elements and accents
      accent: "#FFECB3", // Soft pastel yellow for backgrounds
      background: "#FFF8E1", // Light creamy yellow for overall background
      text: "#333333", // Dark gray for readability
      border: "#E0C200", // Muted gold for borders and dividers
      white: "#ffffff", // White for contrast
    };

    // Add a subtle background pattern
    addBackgroundPattern(doc, colors);

    // Add header section
    addHeader(doc, startDate, endDate, colors);

    // Add report metadata
    addReportMetadata(doc, startDate, endDate, colors);

    // Define column positions
    const productNameX = 50;
    const quantityX = 370;
    const priceX = 470;

    // Add table headers with green background
    addTableHeaders(doc, productNameX, quantityX, priceX, colors);

    // Add orders data
    let totalRevenue = 0;
    let totalQuantity = 0;
    let yPosition = doc.y + 10; // Start table rows below headers
    let currentPage = 1;

    orders.forEach((order, index) => {
      // Check if we need a new page
      if (yPosition > 680) {
        doc.addPage();
        currentPage++;
        // Add subtle background to new page
        addBackgroundPattern(doc, colors);
        // Add table headers to new page
        addTableHeaders(doc, productNameX, quantityX, priceX, colors);
        yPosition = 130; // Reset yPosition for new page with space for headers
      }

      // Add table row
      addTableRow(
        doc,
        order,
        productNameX,
        quantityX,
        priceX,
        yPosition,
        index,
        colors,
      );
      yPosition += 30; // More space between rows for better readability

      // Calculate totals
      totalRevenue += order.price * order.quantity || 0;
      totalQuantity += order.quantity || 0;
    });

    // Add summary section on the left side
    addSummary(doc, totalRevenue, totalQuantity, orders.length, colors);

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

const addHeader = (doc, startDate, endDate, colors) => {
  // Add main heading with gradient-like effect (full width)
  doc.rect(50, 40, 500, 40).fillColor(colors.primary).fill();

  // Add a subtle accent line
  doc.rect(50, 80, 500, 5).fillColor(colors.secondary).fill();

  doc
    .fillColor(colors.white)
    .fontSize(22)
    .font("Helvetica-Bold")
    .text("FRESH OIL SALES REPORT", 50, 54, { align: "center" })
    .moveDown(2);
};

const addReportMetadata = (doc, startDate, endDate, colors) => {
  // Format the dates using moment
  const formattedStartDate = moment(startDate).format("MMMM D, YYYY");
  const formattedEndDate = moment(endDate).format("MMMM D, YYYY");

  doc
    .rect(50, 95, 500, 45)
    .fillColor(colors.accent)
    .fill()
    .strokeColor(colors.border)
    .stroke();

  doc
    .fillColor(colors.text)
    .fontSize(11)
    .font("Helvetica-Bold")
    .text("Report Period:", 60, 105)
    .font("Helvetica")
    .text(`${formattedStartDate} to ${formattedEndDate}`, 150, 105);

  doc
    .font("Helvetica-Bold")
    .text("Generated On:", 60, 123)
    .font("Helvetica")
    .text(moment().format("MMMM D, YYYY [at] h:mm A"), 150, 123);

  doc.moveDown(2);
};

const addTableHeaders = (doc, productNameX, quantityX, priceX, colors) => {
  // Add table header background with rounded corners
  const headerY = doc.y;
  doc
    .roundedRect(productNameX, headerY, 500, 25, 3)
    .fillColor(colors.primary)
    .fill()
    .stroke();

  // Add header text
  doc
    .fillColor(colors.white)
    .fontSize(12)
    .font("Helvetica-Bold")
    .text("Product Name", productNameX + 10, headerY + 7)
    .text("Quantity", quantityX, headerY + 7)
    .text("Total (Tsh)", priceX, headerY + 7);

  // Add horizontal line below headers
  doc
    .moveTo(productNameX, headerY + 27)
    .lineTo(550, headerY + 27)
    .strokeColor(colors.border)
    .stroke();
};

const addTableRow = (
  doc,
  order,
  productNameX,
  quantityX,
  priceX,
  yPosition,
  index,
  colors,
) => {
  // Alternate row backgrounds with subtle effect
  if (index % 2 === 0) {
    doc
      .rect(productNameX, yPosition, 500, 25)
      .fillColor(colors.accent)
      .fillOpacity(0.5)
      .fill()
      .fillOpacity(1);
  }

  // Add row content
  doc.fillColor(colors.text).fontSize(11).font("Helvetica");

  // Product Name
  doc.text(order.productName || "N/A", productNameX + 10, yPosition + 8, {
    width: 300,
    align: "left",
  });

  // Quantity with right alignment
  doc.text((order.quantity || 0).toString(), quantityX, yPosition + 8, {
    width: 50,
    align: "right",
  });

  // Total Price with formatting
  const formattedTotal = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(order.price * order.quantity || 0);

  doc.text(formattedTotal, priceX, yPosition + 8, {
    width: 80,
    align: "right",
  });

  // Add subtle row border
  doc
    .moveTo(productNameX, yPosition + 29)
    .lineTo(550, yPosition + 29)
    .strokeColor(colors.border)
    .lineWidth(0.5)
    .stroke();
};

const addSummary = (doc, totalRevenue, totalQuantity, orderCount, colors) => {
  // Add a page break if we're close to the bottom
  if (doc.y > 650) {
    doc.addPage();
    addBackgroundPattern(doc, colors);
  }

  // Add summary title
  doc.moveDown(1);
  doc
    .fillColor(colors.primary)
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("SUMMARY", 50, doc.y, { align: "left" })
    .moveDown(0.5);

  // Add decorative line
  doc
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .strokeColor(colors.primary)
    .lineWidth(1)
    .stroke();
  doc.moveDown(1);

  // Add summary box with shadow effect - on the left side
  const summaryY = doc.y;

  // Shadow effect (subtle offset rectangle)
  doc
    .rect(55, summaryY + 3, 250, 100)
    .fillColor(colors.border)
    .fillOpacity(0.3)
    .fill()
    .fillOpacity(1);

  // Main summary box
  doc
    .rect(50, summaryY, 250, 100)
    .fillColor(colors.accent)
    .fill()
    .strokeColor(colors.primary)
    .stroke();

  // Add summary content with better formatting
  doc
    .fillColor(colors.primary)
    .fontSize(12)
    .font("Helvetica-Bold")
    .text("SALES SUMMARY", 70, summaryY + 15);

  // Add horizontal line in summary box
  doc
    .moveTo(70, summaryY + 30)
    .lineTo(280, summaryY + 30)
    .strokeColor(colors.primary)
    .lineWidth(0.5)
    .stroke();

  // Format the total revenue
  const formattedRevenue = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalRevenue);

  // Add summary details
  doc
    .fontSize(11)
    .font("Helvetica-Bold")
    .text("Total Orders:", 70, summaryY + 40)
    .font("Helvetica")
    .text(orderCount.toString(), 280, summaryY + 40, { align: "right" });

  doc
    .font("Helvetica-Bold")
    .text("Total Items Sold:", 70, summaryY + 60)
    .font("Helvetica")
    .text(totalQuantity.toString(), 280, summaryY + 60, { align: "right" });

  doc
    .font("Helvetica-Bold")
    .text("Total Revenue:", 70, summaryY + 80)
    .font("Helvetica")
    .text(`Tsh ${formattedRevenue}`, 280, summaryY + 80, { align: "right" });
};

const addFooter = (doc, colors) => {
  const pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i);

    // Add page numbers
    doc
      .fillColor(colors.subtleText)
      .fontSize(9)
      .text(`Page ${i + 1} of ${pages.count}`, 0, doc.page.height - 40, {
        align: "center",
      });

    // Add timestamp and confidentiality notice
    doc
      .fillColor(colors.subtleText)
      .fontSize(8)
      .text(
        `Generated on ${moment().format("YYYY-MM-DD [at] HH:mm")} | CONFIDENTIAL DOCUMENT | FOR INTERNAL USE ONLY`,
        0,
        doc.page.height - 25,
        { align: "center" },
      );
  }
};

module.exports = {
  generateFreshOilPDF,
};

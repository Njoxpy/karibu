const PDFDocument = require("pdfkit");

const generateAnimalFeedingPDF = (orders, res, startDate, endDate) => {
  try {
    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
      bufferPages: true,
    });

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=animal_feeding_report.pdf"
    );
    doc.pipe(res);

    // Define styling constants
    const colors = {
      primary: "#1a5d1a", // Dark green for main elements
      secondary: "#2E8B57", // Sea green for secondary
      accent: "#f0f9f0", // Light green background
      text: "#2d3436", // Dark gray text
      border: "#e8e8e8", // Light gray borders
      white: "#ffffff",
    };

    // Add header section
    addHeader(doc, startDate, endDate, colors);

    // Set up table layout
    const tableTop = doc.y + 20;
    const columnWidths = {
      productName: 250,
      quantity: 100,
      price: 150,
    };

    // Add table headers
    addTableHeaders(doc, tableTop, columnWidths, colors);

    // Add table rows with improved spacing
    let yPosition = tableTop + 30;
    let currentPage = 1;

    orders.forEach((order, index) => {
      // Check if we need a new page
      if (yPosition > 700) {
        doc.addPage();
        currentPage++;
        // Add table headers to new page
        addTableHeaders(doc, 50, columnWidths, colors);
        yPosition = 80;
      }

      addTableRow(doc, order, yPosition, columnWidths, index, colors);
      yPosition += 25;
    });

    // Add final border
    doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();

    // Add summary section
    addSummary(doc, orders, colors);

    // Add page numbers
    addPageNumbers(doc);

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Error generating PDF" });
  }
};

const addHeader = (doc, startDate, endDate, colors) => {
  // Add logo placeholder with border
  doc.rect(50, 50, 60, 60).strokeColor(colors.primary).stroke();
  doc.fontSize(10).fillColor(colors.primary).text("Logo", 65, 75);

  // Company name and report title
  doc
    .fontSize(24)
    .font("Helvetica-Bold")
    .fillColor(colors.primary)
    .text("Savarrah", 120, 50)
    .fontSize(16)
    .font("Helvetica")
    .fillColor(colors.secondary)
    .text("Animal Feeding Sales Report", 120, 80);

  // Date range in a styled box
  doc.rect(120, 100, 200, 25).fillColor(colors.accent).fill();

  doc
    .fillColor(colors.primary)
    .fontSize(12)
    .text(`${startDate} – ${endDate}`, 130, 107);

  // Decorative line
  doc
    .moveTo(50, 140)
    .lineTo(550, 140)
    .strokeColor(colors.secondary)
    .strokeOpacity(0.5)
    .stroke();
};

const addTableHeaders = (doc, tableTop, columnWidths, colors) => {
  // Add table header background
  doc.rect(50, tableTop, 500, 25).fillColor(colors.primary).fill();

  // Add header text
  doc.fillColor(colors.white).fontSize(12).font("Helvetica-Bold");

  const headers = [
    {
      text: "Product Name",
      x: 60,
      width: columnWidths.productName,
      align: "left",
    },
    { text: "Quantity", x: 310, width: columnWidths.quantity, align: "center" },
    { text: "Total Price", x: 410, width: columnWidths.price, align: "right" },
  ];

  headers.forEach((header) => {
    doc.text(header.text, header.x, tableTop + 7, {
      width: header.width,
      align: header.align,
    });
  });
};

const addTableRow = (doc, order, yPosition, columnWidths, index, colors) => {
  // Alternate row backgrounds
  if (index % 2 === 0) {
    doc
      .rect(50, yPosition, 500, 20)
      .fillColor(colors.accent)
      .fillOpacity(0.3)
      .fill()
      .fillOpacity(1);
  }

  // Add row content
  doc.fillColor(colors.text).fontSize(11).font("Helvetica");

  // Product name
  doc.text(order.productId.name, 60, yPosition + 5, {
    width: columnWidths.productName,
    align: "left",
  });

  // Quantity
  doc.text(order.quantity.toString(), 310, yPosition + 5, {
    width: columnWidths.quantity,
    align: "center",
  });

  // Price
  doc.text(formatCurrency(order.total), 410, yPosition + 5, {
    width: columnWidths.price,
    align: "right",
  });

  // Add subtle row border
  doc
    .moveTo(50, yPosition)
    .lineTo(550, yPosition)
    .strokeColor(colors.border)
    .stroke();
};

const addSummary = (doc, orders, colors) => {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalQuantity = orders.reduce((sum, order) => sum + order.quantity, 0);
  const averagePrice = orders.length > 0 ? totalRevenue / totalQuantity : 0;

  // Add summary box
  const summaryY = doc.y + 30;
  doc
    .rect(300, summaryY, 250, 100)
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
    { label: "Total Products Sold:", value: totalQuantity.toString() },
    {
      label: "Average Price per Product:",
      value: formatCurrency(averagePrice),
    },
    { label: "Total Revenue:", value: formatCurrency(totalRevenue) },
  ];

  doc.fontSize(11).font("Helvetica");

  summaryItems.forEach((item, index) => {
    doc
      .text(item.label, 320, summaryY + 40 + index * 20)
      .text(item.value, 470, summaryY + 40 + index * 20, { align: "right" });
  });
};

const addPageNumbers = (doc) => {
  const pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i);
    doc
      .fillColor("#666666")
      .fontSize(10)
      .text(`Page ${i + 1} of ${pages.count}`, 50, 750, { align: "center" });
  }
};

const formatCurrency = (amount) => {
  return `Tsh ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

module.exports = { generateAnimalFeedingPDF };

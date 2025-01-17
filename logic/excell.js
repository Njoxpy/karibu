const XLSX = require("xlsx");

// Create a new workbook and sheet
const wb = XLSX.utils.book_new();
const ws_data = [
  ["name", "price", "quantity", "location", "description", "condition"],
  ["Product 1", 100, 50, "Warehouse 1", "Description of Product 1", "new"],
  [
    "Product 2",
    200,
    30,
    "Warehouse 2",
    "Description of Product 2",
    "low stock",
  ],
  [
    "Product 3",
    150,
    20,
    "Warehouse 3",
    "Description of Product 3",
    "out of stock",
  ],
  ["Product 4", 50, 100, "Warehouse 4", "Description of Product 4", "new"],
  ["Product 5", 75, 75, "Warehouse 5", "Description of Product 5", "new"],
];

// Convert the data into a worksheet
const ws = XLSX.utils.aoa_to_sheet(ws_data);

// Append the worksheet to the workbook
XLSX.utils.book_append_sheet(wb, ws, "Products");

// Write the workbook to a file (in this case, 'sample_products.xlsx')
XLSX.writeFile(wb, "sample_products.xlsx");

console.log("Excel file created successfully!");

// Node.js script to compare file sizes
const fs = require("fs");
const path = require("path");

// Define the paths to the files you want to compare
const filePaths = [
  path.resolve(__dirname, "part-1/dist/bundle.js"),
  path.resolve(__dirname, "part-2/dist/main.bundle.js"),
  path.resolve(__dirname, "part-2/dist/main.mjs"),
];

// Function to get the size of a file
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

// Function to create a comparative report
function createReport(filePaths) {
  const report = filePaths
    .map((filePath) => {
      const size = getFileSize(filePath);
      return `File: ${filePath}\nSize: ${size} bytes\n`;
    })
    .join("\n");
  return report;
}

// Create and log the report
const report = createReport(filePaths);
fs.writeFileSync(path.resolve(__dirname, "report.txt"), report);

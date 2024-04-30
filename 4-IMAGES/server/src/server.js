const express = require("express");
const resize = require("./resize");
const path = require("path"); // Import the 'path' module
const fs = require("fs");

const server = express();

server.get("/:imageName", (req, res) => {
  // Extract the query-parameter
  const imageName = req.params.imageName;
  const widthString = req.query.width;
  const heightString = req.query.height;
  const format = req.query.format;

  // Parse to integer if possible
  let width, height;
  if (widthString) {
    width = parseInt(widthString);
  }
  if (heightString) {
    height = parseInt(heightString);
  }

  const sanitizedImageName = path.basename(imageName);
  const imagePath = `images/${sanitizedImageName}.jpeg`;

  if (fs.existsSync(imagePath)) {
    res.type(`image/${format || "png"}`);
    resize(imagePath, format, width, height).pipe(res);
  } else {
    res.status(404).send("Image not found");
  }
});

server.listen(8000, () => {
  console.log("Server started!");
});

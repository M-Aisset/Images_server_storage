const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 4000;

app.use(cors());

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});

// Set up multer middleware
const upload = multer({ storage: storage });

// Define route for file upload
app.post("/upload", upload.single("file"), (req, res) => {
  // File has been uploaded successfully
  // Send back the file information
  res.json({
    filename: req.file.filename,
    path: req.file.path,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
});

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const multer = require("multer");
const path = require("path");
const filePath = path.join(process.cwd(), "public", "uploads");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(process.cwd(), "public", "uploads"));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

function fileFilter(req, file, cb) {
  cb(null, true);
}

module.exports = multer({ storage: storage, fileFilter });
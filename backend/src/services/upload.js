const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    const folderPath = path.resolve(__dirname, "..", "..", "uploads", "images");
    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: (_, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err);
      const fileName = `${hash.toString("hex")}-${file.originalname}`;
      cb(null, fileName);
    });
  },
});

const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB
};

// Upload para múltiplas imagens de posts
const uploadSpecieImages = multer({ storage, limits }).array("specieImages");

// Upload para uma única foto de perfil
const uploadProfilePicture = multer({ storage, limits }).single("profilePicture");

module.exports = {
  uploadSpecieImages,
  uploadProfilePicture,
};

require("dotenv").config();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

console.log("Cloudinary ENV:", {
  name: process.env.CLOUDINARY_NAME,
  key: process.env.CLOUDINARY_KEY,
  secret: process.env.CLOUDINARY_SECRET?.slice(0,4) + "*****",
});

try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
} catch (err) {
  console.error("Cloudinary CONFIG ERROR:", err);
}

let storage;
try {
  storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "doctor_profiles",
      allowed_formats: ["jpg", "jpeg", "png"],
    },
  });
} catch (err) {
  console.error("Cloudinary STORAGE ERROR:", err);
}

module.exports = multer({ storage });

const cloudinary = require('./cloudinaryConfig');
const fs = require('fs');

async function uploadImage(imagePath, folderName) {
  try {
    // Upload the file directly from the local path provided by Multer
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: folderName,
    });
    
    // Optionally delete the local file after upload if you don't need to keep it
    fs.unlinkSync(imagePath);

    return result;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

module.exports = uploadImage;

const cloudinary = require('./cloudinaryConfig');
const fs = require('fs');
async function uploadImageBase64(base64String, folderName) {
  try {
    // Upload the base64 string to Cloudinary
    const result = await cloudinary.uploader.upload(base64String, {
      folder: folderName,
    });

    return result;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

module.exports = {
  uploadImageBase64,
};
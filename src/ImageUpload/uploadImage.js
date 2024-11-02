const cloudinary = require('./cloudinaryConfig');
const fs = require('fs');
async function uploadImage(base64) {
  try {
    const result = await cloudinary.uploader.upload(base64, {upload_present: 'IsraelTransport'})
    return result;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

module.exports = {
  uploadImage,
};
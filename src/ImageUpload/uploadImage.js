const cloudinary = require('./cloudinaryConfig');

async function uploadImage(base64, FolderName) {
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

const express = require('express');
const { uploadImageController } = require('./ImageUpload.Controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temporary storage for uploaded files

const router = express.Router();

// Route to handle image upload to Cloudinary
router.post('/UploadImage', upload.single('image'), uploadImageController);

module.exports = router;

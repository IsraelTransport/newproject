const fs = require('fs');
const { convertImageToBase64 } = require('./convertImageToBase64'); 
const { uploadImage } = require('./uploadImage'); 

async function uploadImageController(req, res) {
    const { tripName } = req.body;  // Trip name should be sent from the frontend
    const imagePath = req.file?.path;

    if (!imagePath || !tripName) {
        return res.status(400).send({ error: 'Image file and trip name are required' });
    }

    const folderName = 'Trips';  // Set default folder name to 'Trips'
    
    try {
        const base64Image = convertImageToBase64(imagePath);
        const uploadResult = await uploadImage(base64Image, folderName, tripName);
        
        const imageURL = uploadResult.secure_url;
        fs.unlinkSync(imagePath);  // Optionally delete the local image file
        res.status(201).send({ message: 'Image uploaded successfully', imageURL });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
}

module.exports = { uploadImageController };

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dfewgggfw",
  api_key: process.env.CLOUDINARY_API_KEY || "112397474245481",
  api_secret: process.env.CLOUDINARY_API_SECRET || "C3M4ApTGRZQztgiqNtL7RHPHy50",
});
console.log("Cloudinary config initialized");

exports.uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log(`Uploading file from path: ${localFilePath}`);

    if (!localFilePath) {
      throw new Error("Local file path is not provided");
    }

    // Upload to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File successfully uploaded to Cloudinary");
    console.log(`Cloudinary URL: ${response.secure_url}`);

    // Delete local file after upload
    try {
      await fs.promises.unlink(localFilePath);
      console.log(`Local file deleted: ${localFilePath}`);
    } catch (fileError) {
      console.error(`Failed to delete local file: ${localFilePath}`, fileError);
    }

    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);

    // Try to delete local file even if upload fails
    try {
      if (fs.existsSync(localFilePath)) {
        await fs.promises.unlink(localFilePath);
        console.log(`Local file deleted after Cloudinary error: ${localFilePath}`);
      }
    } catch (fileError) {
      console.error(`Failed to delete local file after upload error: ${localFilePath}`, fileError);
    }

    throw new Error("Cloudinary upload failed");
  }
};

exports.deleteFromCloudinary = async (imageUrl) => {
  try {
    const url = new URL(imageUrl);
    const pathname = url.pathname; // /v1691234567/folder/image.jpg
    const publicId = pathname
      .split('/')
      .slice(2) // remove leading `/v1234567`
      .join('/')
      .replace(/\.[^/.]+$/, ''); // strip extension

    await cloudinary.uploader.destroy(publicId, { invalidate: true });
    console.log('Image deleted from Cloudinary');
  } catch (error) {
    console.error('Failed to delete image from Cloudinary:', error);
  }
};
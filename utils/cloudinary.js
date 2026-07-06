import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (localFilePath) => {
    try{
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // Automatically detects if it's an image, video, or raw file
        });
        
        // Delete file after successful upload
        try {
            if(fs.existsSync(localFilePath)){
                fs.unlinkSync(localFilePath);
                console.log("File deleted successfully:", localFilePath);
            }
        } catch (deleteErr) {
            console.error("Failed to delete file:", localFilePath, deleteErr.message);
        }
        
        return response; // Contains the secure cloud URL and asset details
    }catch(err){
        // Try to delete file on upload failure too
        try {
            if(fs.existsSync(localFilePath)){
                fs.unlinkSync(localFilePath)
            }
        } catch (deleteErr) {
            console.error("Failed to delete file after upload error:", deleteErr.message);
        }
        console.log("Cloudinary upload failed: ", err.message);
        return null;
    }
}


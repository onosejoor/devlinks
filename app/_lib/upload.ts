"use server";

import axios from "axios";

const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET!;
const CLOUDINARY_LINK = process.env.CLOUDINARY_LINK!;

export default async function uploadImage(file?: File | null, id?: string) {
  if (!file) return { success: false, image: null };

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const request = await axios.post(CLOUDINARY_LINK, formData);
    const result = request.data;

    if (result) {
      return {
        success: true,
        image: result.secure_url,
      };
    }
    return { success: false, message: "An error occurred, try again later" };
  } catch (error: any) {
    console.log("[UPLOAD_IMAGE_ERROR]" + error.message);

    return { success: false, message: error.message };
  }
}

// if (id) {
//   const generateSignature = (publicId: string, apiSecret: string) => {
//     const timestamp = new Date().getTime();
//     return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
//   };

//   const timestamp = new Date().getTime().toString();
//   const signature = generateSignature(id, API_SECRET);

//   const formData = new URLSearchParams();
//   formData.append("public_id", id);
//   formData.append("signature", signature);
//   formData.append("api_key", API_KEY!);
//   formData.append("timestamp", timestamp);
//   console.log(id);

//   try {
//     const response = await axios.post(CLOUDINARY_DELETE_LINK, formData);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

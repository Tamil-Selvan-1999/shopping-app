// TS code for updating url in mongodb

import mongoose from "mongoose";
import User from "../models/User";

const oldBase = "https://dummyjson.com";
const newBase = "/static/images"; // your new local path

const convertUrl = (url: string) => {
  if (url.startsWith(oldBase)) {
    return url.replace(oldBase, newBase);
  }
  return url;
};

const updateImageUrls = async () => {
  await mongoose.connect("mongodb://localhost:27017/product_data");

  const users = await User.find({});

  for (const user of users) {
    let changed = false;
    console.log(`✅ Updating userId: ${user.userId}`);
    console.log(`✅ UserID image before update: ${user.image}`);

    user.image = convertUrl(user.image);
    changed = true;
    console.log(`✅ UserID image after update: ${user.image}`);

    if (changed) {
      await user.save();
      console.log(`✅ Updated userId: ${user.userId}`);
    }
  }

  await mongoose.disconnect();
};

updateImageUrls().catch(console.error);

//JS Getting urls from mongodb and storing in json

// Assuming products is your array of ProductDocument objects
// const products: any[] = [
//   // Example objects
//   // {
//   //   meta: { qrCode: "QR123" },
//   //   images: ["img1.jpg", "img2.jpg"],
//   //   thumbnail: "thumb.jpg"
//   // }
// ];

// const fs = require("fs");
// const users = require("./new_users_hashed.json");

// // Final array to store all values
// const resultList = [];

// users.forEach((user) => {
//   // Add thumbnail
//   if (user.image) {
//     resultList.push(user.image);
//   }
// });

// const filePath = __dirname + "\\user_image_list.json";

// fs.writeFileSync(filePath, JSON.stringify(resultList));

// console.log(resultList);

// js code to dowload images

// const axios = require("axios");
// const fs = require("fs");
// const path = require("path");

// // Load URLs from JSON file (or use .txt variant below)
// const imageUrls = JSON.parse(
//   fs.readFileSync("Data\\user_image_list.json", "utf-8")
// );

// // Remove duplicates
// const uniqueUrls = [...new Set(imageUrls)];

// // Base output folder
// const baseDir = path.join(__dirname, "static\\images");

// const getLocalPathFromUrl = (imageUrl) => {
//   const parsedUrl = new URL(imageUrl);
//   const urlPath = decodeURIComponent(parsedUrl.pathname); // handles %20 or special chars
//   return path.join(baseDir, urlPath); // full path including folders and filename
// };

// const ensureDirExists = (filePath) => {
//   const dir = path.dirname(filePath);
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }
// };

// const downloadImage = async (imageUrl) => {
//   try {
//     const filePath = getLocalPathFromUrl(imageUrl);
//     ensureDirExists(filePath);

//     const response = await axios.get(imageUrl, { responseType: "stream" });
//     const writer = fs.createWriteStream(filePath);

//     response.data.pipe(writer);

//     return new Promise((resolve, reject) => {
//       writer.on("finish", () => {
//         console.log(`✅ Downloaded: ${filePath}`);
//         resolve();
//       });
//       writer.on("error", reject);
//     });
//   } catch (error) {
//     console.error(`❌ Failed to download ${imageUrl}: ${error.message}`);
//   }
// };

// const downloadAllImages = async () => {
//   for (const imageUrl of uniqueUrls) {
//     await downloadImage(imageUrl);
//   }
// };

// downloadAllImages();

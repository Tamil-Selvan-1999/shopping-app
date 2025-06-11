import mongoose from "mongoose";
import Product from "../models/Product"; // TypeScript resolves the .ts extension

const oldBase = "https://cdn.dummyjson.com";
const newBase = "/static/images"; // your new local path

const convertUrl = (url: string) => {
  if (url.startsWith(oldBase)) {
    return url.replace(oldBase, newBase);
  }
  return url;
};

const updateImageUrls = async () => {
  await mongoose.connect("mongodb://localhost:27017/product_data");

  const products = await Product.find({});

  for (const product of products) {
    let changed = false;

    // images[]
    product.images = product.images.map((url: string) => {
      const newUrl = convertUrl(url);
      if (newUrl !== url) changed = true;
      return newUrl;
    });

    // thumbnail
    const newThumb = convertUrl(product.thumbnail);
    if (newThumb !== product.thumbnail) {
      product.thumbnail = newThumb;
      changed = true;
    }

    // meta.qrCode
    if (product.meta && product.meta.qrCode) {
      const newQr = convertUrl(product.meta.qrCode);
      if (newQr !== product.meta.qrCode) {
        product.meta.qrCode = newQr;
        changed = true;
      }
    }

    if (changed) {
      await product.save();
      console.log(`✅ Updated productId: ${product.productId}`);
    }
  }

  await mongoose.disconnect();
};

updateImageUrls().catch(console.error);

import { createCanvas, loadImage } from "@napi-rs/canvas";
import axios from "axios";
import fs from "fs";
// import md5 from "md5";
import * as thumbhash from "thumbhash";
import { encode } from "uint8-to-base64";

import { CRYPTO_SYMBOL_LIST } from "./list.js";

function uint8arrayToStringMethod(myUint8Arr) {
  return encode(myUint8Arr);
  // return md5(myUint8Arr);
}

async function loadImageAndConvertToHash(imagePath) {
  const maxSize = 100;
  const image = await loadImage(imagePath);
  const width = image.width;
  const height = image.height;

  const scale = Math.min(maxSize / width, maxSize / height);
  const resizedWidth = Math.floor(width * scale);
  const resizedHeight = Math.floor(height * scale);

  const canvas = createCanvas(resizedWidth, resizedHeight);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, resizedWidth, resizedHeight);

  const imageData = ctx.getImageData(0, 0, resizedWidth, resizedHeight);
  const rgba = new Uint8Array(imageData.data.buffer);
  const hash = thumbhash.rgbaToThumbHash(resizedWidth, resizedHeight, rgba);
  return uint8arrayToStringMethod(hash);
}

async function downloadImage(path) {
  console.log("IMAGE URL", path);
  return axios.get(path, { responseType: "arraybuffer" });
}

function generateImagePath(symbol) {
  return `./dist/images/${symbol.toLowerCase()}.png`;
}

export async function downloadAndConvertImages() {
  const baseUrl = "https://tokenize-dev.com/assets/images/currency-logos/";

  console.log("CRYPTO_SYMBOL_LIST", CRYPTO_SYMBOL_LIST.length);

  const ignore_map = {
    SGD: true,
    DYM: true,
    JUP: true,
    PYTH: true,
    STRK: true,
    USD: true,
  };

  try {
    fs.mkdirSync("./dist/images", { recursive: true });
    const image_paths = [];
    const promisesDownload = [];
    const symbol_list = [];
    for (const symbol of CRYPTO_SYMBOL_LIST) {
      if (ignore_map[symbol]) continue;

      const imageUrl = `${baseUrl}${symbol.toLowerCase()}.png`;

      console.log("IMAGE URL", imageUrl);
      symbol_list.push(symbol);
      promisesDownload.push(downloadImage(imageUrl));
      image_paths.push(generateImagePath(symbol));
    }

    /**
     * await download
     */
    const downloadResponseList = await Promise.all(promisesDownload);

    console.log("------> COMPLETED DOWNLOADING IMAGES");
    /**
     * write file to disk
     */
    const writeFilePromises = [];
    downloadResponseList.forEach((response, index) => {
      const filePath = image_paths[index];
      console.log("----> FILE PATH TO SAVE", filePath);
      writeFilePromises.push(fs.writeFileSync(filePath, response.data));
    });
    console.log("------> WRITE FILE TO DISK");

    // await Promise.all(writeFilePromises);

    const hashPromises = [];
    image_paths.forEach((imagePath) => {
      hashPromises.push(loadImageAndConvertToHash(imagePath));
    });

    console.log("--------> START HASH PATH");

    const hashList = await Promise.all(hashPromises);

    const hashData = {};

    for (let i = 0; i < symbol_list.length; i++) {
      hashData[symbol_list[i]] = hashList[i];
    }

    const jsonFilePath = "./dist/thumb_hash.json";
    fs.writeFileSync(jsonFilePath, JSON.stringify(hashData), {});
    console.log("JSON file created:", jsonFilePath);

    console.log("HASH RESULT", hashData);
  } catch (error) {
    console.error(
      "Error downloading and converting images:",
      error?.message,
      error?.config?.url,
    );
  }
  console.log("----------> ALL HASH DATA");
}

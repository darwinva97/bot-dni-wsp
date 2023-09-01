const path = require("path");
const fs = require("fs");
const mime = require("mime-types");

const writeImage = (base64String) => {
  const time = Date.now();
  const [extensionPart, dataPart] = base64String.split(";base64,");
  const extension = mime.extension(extensionPart.split("data:")[1]);

  if (!extension) {
    throw new Error("Extension not found");
  }

  const fileName = `${time}.${extension}`;
  const filePath = path.join(__dirname, "..", "..", "tmp", fileName);

  const imageBuffer = Buffer.from(dataPart, 'base64');
  fs.writeFileSync(filePath, imageBuffer);

  const remove = () => {
    fs.unlinkSync(filePath);
  };

  return {
    filePath,
    fileName,
    remove,
  };
};

module.exports = { writeImage };

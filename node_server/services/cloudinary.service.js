const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

module.exports.uploadTokenImage = async (localPath) => {
  const token_path = 'dwarfity/tokens';

  const response = await cloudinary.v2.uploader.upload(localPath, {
    folder: token_path
  });

  console.log(response);
};

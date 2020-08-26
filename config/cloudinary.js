require('dotenv').config();

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({

  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
 
});
var storage = cloudinaryStorage({
  cloudinary,
  folder: 'pixeller-gallery', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }],
  // params: { resource_type: 'raw' }, => this is in case you want to upload other type of files, not just images
  filename: function (req, res, cb) {
    let fileName = res.originalname.split(".");
    cb(null, fileName[0]); // The file on cloudinary would have the same name as the original file name
  }
});
const uploader = multer({ storage });
module.exports = uploader;







// require('dotenv').config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const storage = cloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: 'destination-folder-in-cloudinary',
//   allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
//   transformation: [{ width: 500, height: 500, crop: 'limit' }]
// });
 
// const parser = multer({ storage: storage });

// module.exports = parser;
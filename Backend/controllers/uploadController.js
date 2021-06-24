const { dataUri, multerUploads } = require('../middleware/multer');
const { uploader } = require('../config/cloudinary');

const uploadImage = async (req, res) => {
  const folder = req.path.split('/', 3)[2];
  if (!req.file) {
    throw new Error('Choose a picture to upload');
  }
  try {
    if (req.file) {
      const file = dataUri(req).content;
      const result = await uploader.upload(file, {
        folder: `MobiHub/${folder}`,
        width: 300,
        height: 300,
        crop: 'fill',
        gravity: 'faces',
      });
      const image = result.secure_url;
      res.json({ image });
    }
  } catch (error) {
    res.json({ msg: error });
  }
};

const uploadProductImage = async (req, res) => {
  if (!req.file) {
    throw new Error('Choose a picture to upload');
  }
  try {
    const file = dataUri(req).content;
    const result = await uploader.upload(file, {
      folder: `MobiHub/products`,
      width: 600,
      height: 600,
      scale: 'fill',
    });
    const image = result.secure_url;
    res.json({ image });
  } catch (error) {
    res.json({ msg: error });
  }
};

module.exports = { uploadImage, uploadProductImage };

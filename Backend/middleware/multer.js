const multer = require("multer"); 
const path = require('path')

const DatauriParser = require('datauri/parser');

const parser = new DatauriParser();

const storage = multer.memoryStorage();
const multerUploads = multer({ storage,fileFilter:(req,file,cb)=>{
  let ext = path.extname(file.originalname);
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
  cb(new Error("File type is not supported"), false);
  return;
  } cb(null,true)
} }).single('image');

const dataUri = req => parser.format(path.extname(req.file.originalname).toString(),req.file.buffer)


module.exports = {multerUploads,dataUri}
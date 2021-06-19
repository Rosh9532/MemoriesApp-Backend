const multer = require("multer");
const shortid = require("shortid");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    },
    fileFilter:(req, file, cb) => {
      if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
        cb(null, true)
      }else{
        cb({message:"Unsupported"},false)
      }
  
      
    }
  })

 

  const upload = multer({ storage:storage ,limits:{fileSize:1024 *1024}})
  module.exports=upload;
import multer from "multer";

//Create Storage:
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Upload");
  },
  filename: (req, file, cb) => {
    var ext = file.originalname.substring(file.originalname.lastIndexOf("."));

    cb(null, file.filename + "_" + Date.now() + ext);
  },
});

let upload = multer({ storage: storage });
export default upload;

import multer from "multer";

// simple storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");  // ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// export multer
const upload = multer({ storage });

export default upload;

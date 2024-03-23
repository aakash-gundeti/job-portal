import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads/");
  },
  filename: (req, file, callback) => {
    const name = Date.now() + "-" + file.originalname;
    callback(null, name);
  },
});

export default multer({ storage });

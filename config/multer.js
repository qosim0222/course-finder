import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
});

const upload = multer({
    storage, limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export default upload;
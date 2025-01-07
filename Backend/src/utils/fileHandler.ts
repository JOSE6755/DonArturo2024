import multer from "multer";
import path from "path";
import fs from "fs";
const storage = multer.diskStorage({
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  destination: async function (req, file, cb) {
    const destPath = path.join(__dirname, "../productImage");
    try {
      await fs.promises.mkdir(destPath, { recursive: true });
      cb(null, destPath);
    } catch (error: any) {
      cb(new Error(`Error during fileUpload: ${error.message}`), "");
    }
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
export const upload = multer({
  limits: { fileSize: 1024 * 1024 * 10 },
  storage: storage,
});

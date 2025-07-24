import multer from "multer";

const storage = multer.memoryStorage(); // store file in memory, not on disk

export const upload = multer({
  storage,
  limits: { files: 1 }, // allow only one file per upload
});

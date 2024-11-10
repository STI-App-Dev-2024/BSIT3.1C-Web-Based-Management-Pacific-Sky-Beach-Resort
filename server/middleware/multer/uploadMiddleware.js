// uploadMiddleware.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

const createUploadMiddleware = ({ folder = 'uploads', fields = [] }) => {
  const allowedFormats = ['jpg', 'jpeg', 'png'];

  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      allowedFormats,
    },
  });

  const fileFilter = (req, file, cb) => {
    const fileExtension = file.mimetype.split('/')[1].toLowerCase();
    if (allowedFormats.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file format: ${fileExtension}. Allowed formats: ${allowedFormats.join(', ')}`), false);
    }
  };

  const upload = multer({ storage, fileFilter });

  return (req, res, next) => {
    const handler = upload.fields(fields);

    handler(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  };
};


export default createUploadMiddleware;

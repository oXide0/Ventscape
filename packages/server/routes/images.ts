import express from 'express';
import multer from 'multer';
import { UPLOAD_ENDPOINT } from 'shared/types';
import { getImage, removeImage, uploadImage } from '../controllers/imagesController';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post(UPLOAD_ENDPOINT, upload.single('file'), uploadImage);
router.get('/:imageId', getImage);
router.delete('/:imageId', removeImage);

export default router;

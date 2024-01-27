import express from 'express';
import multer from 'multer';
import { UPLOAD_ENDPOINT } from 'shared/types';
import { getImage, removeImage, uploadImage } from '../controllers/imagesController';
import { verifyJwt } from '../middlewares/verifyJwt';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post(UPLOAD_ENDPOINT, upload.single('file'), uploadImage, verifyJwt);
router.get('/:imageId', getImage);
router.delete('/:imageId', removeImage, verifyJwt);

export default router;

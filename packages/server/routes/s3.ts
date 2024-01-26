import express from 'express';
import { UPLOAD_ENDPOINT } from 'shared/types';
import { getFile, uploadFile } from '../controllers/filesController';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post(UPLOAD_ENDPOINT, upload.single('file'), uploadFile);
router.get('/:fileId', getFile);

export default router;

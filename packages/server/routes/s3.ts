import express from 'express';
import multer from 'multer';
import { UPLOAD_ENDPOINT } from 'shared/types';
import { deleteFile, getFile, uploadFile } from '../controllers/filesController';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post(UPLOAD_ENDPOINT, upload.single('file'), uploadFile);
router.get('/:fileId', getFile);
router.delete('/:fileId', deleteFile);

export default router;

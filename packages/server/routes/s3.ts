import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import express from 'express';
import multer from 'multer';
import { Readable } from 'stream';

const router = express.Router();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
});

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }

    const fileStream = new Readable();
    fileStream.push(req.file.buffer);
    fileStream.push(null);

    try {
        const uploadFile = new Upload({
            client: s3Client,
            params: {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: req.file.originalname,
                Body: fileStream,
            },
        });

        await uploadFile.done();
        res.send('File uploaded successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to upload file');
    }
});

export default router;

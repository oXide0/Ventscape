import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
});

export const uploadFile = async (req: Request, res: Response) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }

    const fileId = `${v4()}-${req.file.originalname}`;

    try {
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileId,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };

        await s3Client.send(new PutObjectCommand(uploadParams));

        res.json({ fileId });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to upload file');
    }
};

export const getFile = async (req: Request, res: Response) => {
    const imageUrl = await getSignedUrl(
        s3Client,
        new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: req.params.fileId,
        }),
        { expiresIn: 60 }
    );

    res.json({ imageUrl });
};

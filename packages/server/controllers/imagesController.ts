import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    S3Client
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { environment } from '../environment';

const s3Client = new S3Client({
    region: environment.awsRegion,
    credentials: {
        accessKeyId: environment.awsAccessKeyId!,
        secretAccessKey: environment.awsSecretAccessKey!
    }
});

export const uploadImage = async (req: Request, res: Response) => {
    if (!req.file) {
        res.json({ id: null });
        return;
    }

    const id = `${v4()}-${req.file.originalname}`;

    try {
        const uploadParams = {
            Bucket: environment.awsBucketName,
            Key: id,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        };

        await s3Client.send(new PutObjectCommand(uploadParams));
        res.json({ id });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to upload file');
    }
};

export const getImage = async (req: Request, res: Response) => {
    const objectCommand = new GetObjectCommand({
        Bucket: environment.awsBucketName,
        Key: req.params.imageId
    });

    try {
        const url = await getSignedUrl(s3Client, objectCommand, { expiresIn: 60 });
        res.json({ url });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to get file');
    }
};

export const removeImage = async (req: Request, res: Response) => {
    const objectCommand = new DeleteObjectCommand({
        Bucket: environment.awsBucketName,
        Key: req.params.imageId
    });

    try {
        await s3Client.send(objectCommand);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to delete file');
    }
};

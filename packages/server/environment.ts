import { config } from 'dotenv';
config();

export const environment = {
    port: process.env.PORT,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    awsRegion: process.env.AWS_REGION,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsBucketName: process.env.AWS_BUCKET_NAME,
    databaseUrl: process.env.DATABASE_URL,
    clientUrl: process.env.CLIENT_URL
};

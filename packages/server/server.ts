import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import router from './routes/router';
config();

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(errorHandler);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api', router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

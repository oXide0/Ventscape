import cors from 'cors';
import express from 'express';
import router from './routes/router';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
// import { Event } from 'shared';
config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

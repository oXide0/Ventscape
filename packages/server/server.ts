import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import expressWs from 'express-ws';
import { errorHandler } from './middlewares/errorHandler';
import router from './routes/router';
import Websocket from 'ws';

config();

const app = express();
const expressWsInstance = expressWs(app);
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

expressWsInstance.app.ws('/api/chat', (ws, __) => {
    ws.on('message', (msg) => {
        expressWsInstance.getWss().clients.forEach((client) => {
            if (client !== ws && client.readyState === Websocket.OPEN) {
                client.send(msg);
            }
        });
    });
});

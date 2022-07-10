import { createServer } from "http";

import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import { Server } from "socket.io";
import "express-async-errors";

import { CORS_ORIGIN, DB_CONNECTION } from "./config/config";
import { socketManager } from "./utils/socketManager";
import { dailyUpdate } from "./utils/dailyUpdate";

import { errorRouter } from "./middlewares/error";

import { achievementsRouter, animeOnTopRouter, animeRouter, homeRouter, newsRouter, cityDefenceRouter, swordArtOnlineRouter, typesRouter, usersRouter, whatsTheMelodyRouter } from "./routers";
import { dbRebuildRouter } from "./routers/dbRebuild";
import { projectsRouter } from "./routers/projects";
import { requestAuthorization } from "./middlewares/requestAuthorization";
import { OnlineUserRecord } from "./records";


// App Config

const app = express();
const port = process.env.PORT || 9000;

// Socket.io Config

const server = createServer(app);
export const io = new Server(server, {
    cors: {
        origin: CORS_ORIGIN,
    },
});

// Middlewares

app.use(express.json());
app.use(express.static('./public'));
app.use(cors({
    origin: CORS_ORIGIN,
}));
app.use(requestAuthorization());

app.use('/', homeRouter);
app.use('/achievements', achievementsRouter);
app.use('/anime', animeRouter);
app.use('/anime-on-top', animeOnTopRouter);
app.use('/news', newsRouter);
app.use('/sword-art-online-clicker', swordArtOnlineRouter);
app.use('/city-defence', cityDefenceRouter);
app.use('/types', typesRouter);
app.use('/users', usersRouter);
app.use('/whats-the-melody', whatsTheMelodyRouter);
app.use('/projects', projectsRouter);
// Router do naprawiania bazy danych
// app.use('/db-rebuild', dbRebuildRouter);
//

app.use(errorRouter);

// DB config

connect(DB_CONNECTION, async () => {
    await OnlineUserRecord.deleteAll();
});

// Socket.io events

socketManager();

// Listener

server.listen(port, () => console.log(`Server is listening on http://localhost:${port}`));

// Daily update

dailyUpdate();
import { Router } from "express";

export const homeRouter = Router();

homeRouter
    .get('/', (req, res) => {
        res.json({
            status: 'OK',
            message: 'Hello clever programmers from AniMark.pl',
        });
    })
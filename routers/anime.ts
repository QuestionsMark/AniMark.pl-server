import { Router } from "express";
import { pagination } from "../middlewares/pagination";
import { AnimeRecord } from "../records";
import { responseApiHelper } from "../utils/responseHelper";

export const animeRouter = Router();

animeRouter
    // Pobieranie wszystkich anime
    .get('/', pagination("ANIME"), (req, res) => {

    })

    // Pobieranie polecanego anime
    .get('/recommended', async (req, res) => {
        res.status(200).json(responseApiHelper(await AnimeRecord.getRecommended()));
    })


    // Pobieranie konkretnego anime
    .get('/:id', (req, res) => {

    })


    // Dodawanie anime
    .post('/', (req, res) => {

    })


    // Usuwanie anime
    .delete('/:id', (req, res) => {

    })


    // Edytowanie anime
    .patch('/:id', (req, res) => {

    })
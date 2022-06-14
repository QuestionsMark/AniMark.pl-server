import { Router } from "express";
import { PaginatedResponse, pagination } from "../middlewares/pagination";
import { AnimeRecord } from "../records";
import { responseApiHelper } from "../utils/responseHelper";

export const animeRouter = Router();

animeRouter
    // Pobieranie wszystkich anime
    .get('/', pagination("ANIME"), (req, res: PaginatedResponse) => {
        res.status(200).json(responseApiHelper(res.results, res.amount));
    })

    // Pobieranie polecanego anime
    .get('/recommended', async (req, res) => {
        res.status(200).json(responseApiHelper(await AnimeRecord.getRecommended()));
    })


    // Pobieranie listy anime do formularza
    .get('/form', async (req, res) => {
        res.status(200).json(responseApiHelper(await AnimeRecord.getAnimeFormList()));
    })


    // Pobieranie konkretnego anime
    .get('/:id', (req, res) => {
        res.end();
    })


    // Dodawanie anime
    .post('/', (req, res) => {
        res.end();
    })


    // Usuwanie anime
    .delete('/:id', (req, res) => {
        res.end();
    })


    // Edytowanie anime
    .patch('/:id', (req, res) => {
        res.end();
    })
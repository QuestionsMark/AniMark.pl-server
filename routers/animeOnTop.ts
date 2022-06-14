import { Router } from "express";
import { ValidationError } from "../middlewares/error";
import { pagination } from "../middlewares/pagination";
import { AnimeOnTopRecord } from "../records";
import { responseApiHelper, responseHelper } from "../utils/responseHelper";

export const animeOnTopRouter = Router();

animeOnTopRouter
    // Pobieranie wszystkich AOT
    .get('/', pagination("ANIME_ON_TOP"), (req, res) => {
        res.end();
    })


    // Pobieranie aktualnego AOT
    .get('/actual', async (req, res) => {
        res.status(200).json(responseApiHelper(await AnimeOnTopRecord.getActual()));
    })


    // Pobieranie konkretnego AOT
    .get('/:id', (req, res) => {
        res.end();
    })


    // Dodawanie AOT
    .post('/', async (req, res) => {
        await AnimeOnTopRecord.setNew();
        res.status(200).json(responseHelper('Ustawiono nowe anime na topie.'));
    })


    // Oddawanie głosu na AOT
    .post('/vote', async (req, res) => {
        const { aotId, userId, vote } = req.body;
        const result = await AnimeOnTopRecord.vote(aotId, userId, vote);
        if (!result) throw new ValidationError('Już oddałeś głos na topowe anime.');
        res.status(200).json(responseHelper('Oddano głos.'));
    })


    // Usuwanie AOT
    .delete('/:id', (req, res) => {
        res.end();
    })


    // Edytowanie AOT
    .patch('/:id', (req, res) => {
        res.end();
    })
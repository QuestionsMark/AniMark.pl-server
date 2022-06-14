import { Router } from "express";
import { PaginatedResponse, pagination } from "../middlewares/pagination";
import { NewsRecord } from "../records";
import { responseApiHelper } from "../utils/responseHelper";

export const newsRouter = Router();

newsRouter
    // Pobieranie wszystkich nowości
    .get('/', pagination("NEWS"), (req, res: PaginatedResponse) => {
        res.end();
    })


    // Pobieranie ostatnich 5 nowości
    .get('/last', async (req, res) => {
        res.status(200).json(responseApiHelper(await NewsRecord.getLast()));
    })


    // Pobieranie konkretnej nowości
    .get('/:id', async (req, res) => {
        await NewsRecord.bumpViews(req.params.id, req.query.userId as string);
        res.status(200).json(responseApiHelper(await NewsRecord.getOne(req.params.id)));
    })


    // Dodawanie nowości
    .post('/', (req, res) => {
        res.end();
    })


    // Usuwanie nowości
    .delete('/:id', (req, res) => {
        res.end();
    })


    // Edytowanie nowości
    .patch('/:id', (req, res) => {
        res.end();
    })
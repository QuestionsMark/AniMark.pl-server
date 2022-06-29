import { Router } from "express";
import { PaginatedResponse, pagination } from "../middlewares/pagination";
import { TypeRecord } from "../records";
import { responseApiHelper } from "../utils/responseHelper";

export const typesRouter = Router();

typesRouter
    // Pobieranie wszystkich gatunków
    .get('/', pagination("TYPES"), (req, res: PaginatedResponse) => {
        res.status(200).json(responseApiHelper(res.results, res.amount));
    })

    // Pobieranie wszystkich gatunków do formularza
    .get('/form', async (req, res) => {
        res.status(200).json(responseApiHelper(await TypeRecord.getFormList()));
    })

    // Pobieranie wszystkich gatunków
    .get('/all', async (req, res) => {
        res.status(200).json(responseApiHelper(await TypeRecord.getAll()));
    })


    // Pobieranie konkretnego gatunku
    .get('/:id', async (req, res) => {
        res.status(200).json(responseApiHelper(await TypeRecord.getOne(req.params.id)));
    })


    // Dodawanie gatunku
    .post('/', (req, res) => {
        res.end();
    })


    // Usuwanie gatunku
    .delete('/:id', (req, res) => {
        res.end();
    })


    // Edytowanie gatunku
    .patch('/:id', (req, res) => {
        res.end();
    })
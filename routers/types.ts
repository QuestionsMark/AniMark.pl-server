import { Router } from "express";
import { pagination } from "../middlewares/pagination";
import { TypeRecord } from "../records";
import { responseApiHelper } from "../utils/responseHelper";

export const typesRouter = Router();

typesRouter
    // Pobieranie wszystkich gatunków
    .get('/', pagination("TYPES"), (req, res) => {
        res.end();
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
    .get('/:id', (req, res) => {
        res.end();
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
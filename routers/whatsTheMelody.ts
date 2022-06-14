import { Router } from "express";
import { pagination } from "../middlewares/pagination";
import { WhatsTheMelodyRecord } from "../records";
import { responseApiHelper } from "../utils/responseHelper";

export const whatsTheMelodyRouter = Router();

whatsTheMelodyRouter
    // Pobieranie wszystkich WTM
    .get('/', pagination("WHATS_THE_MELODY"), (req, res) => {
        res.end();
    })


    // Pobieranie aktualnego WTM
    .get('/actual', async (req, res) => {
        res.status(200).json(responseApiHelper(await WhatsTheMelodyRecord.getActual()));
    })


    // Pobieranie wyników aktualnego WTM
    .get('/actual/results', async (req, res) => {
        res.status(200).json(responseApiHelper(await WhatsTheMelodyRecord.getActualResults()));
    })


    // Pobieranie komentarzy aktualnego WTM
    .get('/actual/comments', async (req, res) => {
        res.status(200).json(responseApiHelper(await WhatsTheMelodyRecord.getActualComments()));
    })



    // Pobieranie konkretnego WTM
    .get('/:id', (req, res) => {
        res.end();
    })


    // Dodawanie WTM
    .post('/', (req, res) => {
        res.end();
    })


    // Usuwanie WTM
    .delete('/:id', (req, res) => {
        res.end();
    })


    // Edytowanie WTM
    .patch('/:id', (req, res) => {
        res.end();
    })
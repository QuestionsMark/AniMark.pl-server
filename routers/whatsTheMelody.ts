import { Router } from "express";
import { pagination } from "../middlewares/pagination";
import { WhatsTheMelodyRecord } from "../records";
import { responseApiHelper } from "../utils/responseHelper";

export const whatsTheMelodyRouter = Router();

whatsTheMelodyRouter
    // Pobieranie wszystkich WTM
    .get('/', pagination("WHATS_THE_MELODY"), (req, res) => {

    })


    // Pobieranie aktualnego WTM
    .get('/actual', async (req, res) => {
        res.status(200).json(responseApiHelper(await WhatsTheMelodyRecord.getActual()));
    })


    // Pobieranie komentarzy aktualnego WTM
    .get('/actual/comments', async (req, res) => {
        res.status(200).json(responseApiHelper(await WhatsTheMelodyRecord.getActualComments()));
    })



    // Pobieranie konkretnego WTM
    .get('/:id', (req, res) => {

    })


    // Dodawanie WTM
    .post('/', (req, res) => {

    })


    // Usuwanie WTM
    .delete('/:id', (req, res) => {

    })


    // Edytowanie WTM
    .patch('/:id', (req, res) => {

    })
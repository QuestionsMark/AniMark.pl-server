import { Router } from "express";
import { pagination } from "../middlewares/pagination";

export const whatsTheMelodyRouter = Router();

whatsTheMelodyRouter
    // Pobieranie wszystkich WTM
    .get('/', pagination("WHATS_THE_MELODY"), (req, res) => {

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
import { Router } from "express";
import { pagination } from "../middlewares/pagination";

export const typesRouter = Router();

typesRouter
    // Pobieranie wszystkich gatunków
    .get('/', pagination("TYPES"), (req, res) => {

    })


    // Pobieranie konkretnego gatunku
    .get('/:id', (req, res) => {

    })


    // Dodawanie gatunku
    .post('/', (req, res) => {

    })


    // Usuwanie gatunku
    .delete('/:id', (req, res) => {

    })


    // Edytowanie gatunku
    .patch('/:id', (req, res) => {

    })
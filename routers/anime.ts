import { Router } from "express";
import { pagination } from "../middlewares/pagination";

export const animeRouter = Router();

animeRouter
    // Pobieranie wszystkich anime
    .get('/', pagination("ANIME"), (req, res) => {

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
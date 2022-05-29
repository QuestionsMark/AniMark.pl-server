import { Router } from "express";
import { pagination } from "../middlewares/pagination";

export const animeOnTopRouter = Router();

animeOnTopRouter
    // Pobieranie wszystkich AOT
    .get('/', pagination("ANIME_ON_TOP"), (req, res) => {

    })


    // Pobieranie konkretnego AOT
    .get('/:id', (req, res) => {

    })


    // Dodawanie AOT
    .post('/', (req, res) => {

    })


    // Usuwanie AOT
    .delete('/:id', (req, res) => {

    })


    // Edytowanie AOT
    .patch('/:id', (req, res) => {

    })
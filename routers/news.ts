import { Router } from "express";
import { pagination } from "../middlewares/pagination";

export const newsRouter = Router();

newsRouter
    // Pobieranie wszystkich nowości
    .get('/', pagination("NEWS"), (req, res) => {

    })


    // Pobieranie konkretnej nowości
    .get('/:id', (req, res) => {

    })


    // Dodawanie nowości
    .post('/', (req, res) => {

    })


    // Usuwanie nowości
    .delete('/:id', (req, res) => {

    })


    // Edytowanie nowości
    .patch('/:id', (req, res) => {

    })
import { Router } from "express";
import { pagination } from "../middlewares/pagination";

export const achievementsRouter = Router();

achievementsRouter
    // Pobieranie wszystkich osiągnięć
    .get('/', pagination("ACHIEVEMENTS"), (req, res) => {

    })


    // Pobieranie konkretnego osiągnięcia
    .get('/:id', (req, res) => {

    })


    // Dodawanie osiągnięcia
    .post('/', (req, res) => {

    })


    // Usuwanie osiągnięcia
    .delete('/:id', (req, res) => {

    })


    // Edytowanie osiągnięcia
    .patch('/:id', (req, res) => {

    })
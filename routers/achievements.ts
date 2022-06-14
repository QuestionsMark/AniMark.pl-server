import { Router } from "express";
import { pagination } from "../middlewares/pagination";

export const achievementsRouter = Router();

achievementsRouter
    // Pobieranie wszystkich osiągnięć
    .get('/', pagination("ACHIEVEMENTS"), (req, res) => {
        res.end();
    })


    // Pobieranie konkretnego osiągnięcia
    .get('/:id', (req, res) => {
        res.end();
    })


    // Dodawanie osiągnięcia
    .post('/', (req, res) => {
        res.end();
    })


    // Usuwanie osiągnięcia
    .delete('/:id', (req, res) => {
        res.end();
    })


    // Edytowanie osiągnięcia
    .patch('/:id', (req, res) => {
        res.end();
    })
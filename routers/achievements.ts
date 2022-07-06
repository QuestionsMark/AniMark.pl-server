import { Router } from "express";
import { PaginatedResponse, pagination } from "../middlewares/pagination";
import { responseApiHelper } from "../utils/responseHelper";

export const achievementsRouter = Router();

achievementsRouter
    // Pobieranie wszystkich osiągnięć
    .get('/', pagination("ACHIEVEMENTS"), (req, res: PaginatedResponse) => {
        res.status(200).json(responseApiHelper(res.results, res.amount));
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
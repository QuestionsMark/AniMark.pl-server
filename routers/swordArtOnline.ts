import { Router } from "express";
import { PaginatedResponse, pagination } from "../middlewares/pagination";
import { responseApiHelper } from "../utils/responseHelper";

export const swordArtOnlineRouter = Router();

swordArtOnlineRouter
    // Pobieranie wszystkich SAOResult
    .get('/', pagination("SWORD_ART_ONLINE_CLICKER"), (req, res: PaginatedResponse) => {
        res.status(200).json(responseApiHelper(res.results, res.amount));
    })


    // Pobieranie konkretnego SAOResult
    .get('/:id', (req, res) => {
        res.end();
    })


    // Dodawanie SAOResult
    .post('/', (req, res) => {
        res.end();
    })


    // Usuwanie SAOResult
    .delete('/:id', (req, res) => {
        res.end();
    })


    // Edytowanie SAOResult
    .patch('/:id', (req, res) => {
        res.end();
    })
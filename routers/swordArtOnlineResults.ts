import { Router } from "express";
import { pagination } from "../middlewares/pagination";

export const swordArtOnlineResultsRouter = Router();

swordArtOnlineResultsRouter
    // Pobieranie wszystkich SAOResult
    .get('/', pagination("SWORD_ART_ONLINE_RESULTS"), (req, res) => {
        res.end();
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
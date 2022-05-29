import { Router } from "express";
import { pagination } from "../middlewares/pagination";

export const swordArtOnlineResultsRouter = Router();

swordArtOnlineResultsRouter
    // Pobieranie wszystkich SAOResult
    .get('/', pagination("SWORD_ART_ONLINE_RESULTS"), (req, res) => {

    })


    // Pobieranie konkretnego SAOResult
    .get('/:id', (req, res) => {

    })


    // Dodawanie SAOResult
    .post('/', (req, res) => {

    })


    // Usuwanie SAOResult
    .delete('/:id', (req, res) => {

    })


    // Edytowanie SAOResult
    .patch('/:id', (req, res) => {

    })
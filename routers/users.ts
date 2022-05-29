import { Router } from "express";
import { pagination } from "../middlewares/pagination";

export const usersRouter = Router();

usersRouter
    // Pobieranie wszystkich użytkowników
    .get('/', pagination("USERS"), (req, res) => {

    })


    // Pobieranie konkretnego użytkownika
    .get('/:id', (req, res) => {

    })


    // Dodawanie użytkownika
    .post('/', (req, res) => {

    })


    // Usuwanie użytkownika
    .delete('/:id', (req, res) => {

    })


    // Edytowanie użytkownika
    .patch('/:id', (req, res) => {

    })
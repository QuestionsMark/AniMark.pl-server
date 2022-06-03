import { Router } from "express";
import { sign } from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config";
import { pagination } from "../middlewares/pagination";
import { UserRecord } from "../records";
import { AuthorizationAPI } from "../types";
import { responseHelper } from "../utils/responseHelper";
import { RegistrationFormEntity } from "../validation/registraction";

export const usersRouter = Router();

usersRouter
    // Pobieranie wszystkich użytkowników
    .get('/', pagination("USERS"), (req, res) => {

    })


    // Pobieranie konkretnego użytkownika
    .get('/:id', (req, res) => {

    })


    // Dodawanie użytkownika
    .post('/', async (req, res) => {
        const { email, login, password, username, rulesAcceptation } = req.body as RegistrationFormEntity;
        const user = await UserRecord.create({ email, login, password, username, rulesAcceptation });
        const { _id: userId, rank } = user;
        const token = sign(
            { userId, rank },
            TOKEN_SECRET,
            { expiresIn: '720h' },
        );
        res.status(201).json(responseHelper(`Witaj ${user.username}! Twoje konto zostało pomyślnie zarejestrowane.`, { token } as AuthorizationAPI));
    })


    // Usuwanie użytkownika
    .delete('/:id', (req, res) => {

    })


    // Edytowanie użytkownika
    .patch('/:id', (req, res) => {

    })
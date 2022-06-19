import { Router } from "express";
import { sign } from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config";
import { ValidationError } from "../middlewares/error";
import { PaginatedResponse, pagination } from "../middlewares/pagination";
import { UserRecord } from "../records";
import { AuthorizationAPI } from "../types";
import { responseApiHelper, responseHelper } from "../utils/responseHelper";
import { RegistrationFormEntity } from "../validation/registraction";

export const usersRouter = Router();

usersRouter
    // Pobieranie wszystkich użytkowników
    .get('/', pagination("USERS"), (req, res: PaginatedResponse) => {
        res.status(200).json(responseApiHelper(res.results, res.amount));
    })


    // Pobieranie rekomendowanych użytkowników
    .get('/recommended', async (req, res) => {
        res.status(200).json(responseApiHelper(await UserRecord.getRecommended()));
    })


    // Pobieranie konkretnego użytkownika
    .get('/:id', async (req, res) => {
        res.status(200).json(responseApiHelper(await UserRecord.getProfile(req.params.id)));
    })


    // Pobieranie danych o anime użytkownika
    .get('/:id/user-anime-data', async (req, res) => {
        res.status(200).json(responseApiHelper(await UserRecord.getAnimeData(req.params.id)));
    })

    // Pobieranie ulubionych anime użytkownika
    .get('/:id/favorite-anime', async (req, res) => {
        res.status(200).json(responseApiHelper(await UserRecord.getFavoriteAnime(req.params.id)));
    })

    // Pobieranie ulubionego gatunku użytkownika
    .get('/:id/favorite-type', async (req, res) => {
        // res.status(200).json(responseApiHelper(await UserRecord.getAnimeData(req.params.id)));
        res.end();
    })

    // Pobieranie ulubionego gatunku użytkownika
    .get('/:id/user-data', async (req, res) => {
        res.status(200).json(responseApiHelper(await UserRecord.getUserData(req.params.id)));
    })

    // Pobieranie tła użytkownika
    .get('/:id/background', async (req, res) => {
        res.status(200).json(responseApiHelper(await UserRecord.getBackground(req.params.id)));
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


    .put('/:userId/like/:like', async (req, res) => {
        const { userId, like } = req.params;
        const status = await UserRecord.likeProfile(userId, like);
        if (!status) throw new ValidationError('Nie znaleziono użytkownika.');
        res.status(200).json(responseHelper('Pomyślnie polubiono lub usunięto polubienie profilu.'));
    })



    .put('/:userId/favorite-anime/:animeId', async (req, res) => {
        const { userId, animeId } = req.params;
        const message = await UserRecord.handleFavoriteAnime(userId, animeId);
        res.status(200).json(responseHelper(message));
    })

    .put('/:userId/watched/:animeId', async (req, res) => {
        const { userId, animeId } = req.params;
        await UserRecord.handleWatched(userId, animeId);
        res.status(200).json(responseHelper('Anime zostało dodane do listy obejrzanych.'));
    })

    .put('/:userId/stopped/:animeId', async (req, res) => {
        const { userId, animeId } = req.params;
        await UserRecord.handleStopped(userId, animeId);
        res.status(200).json(responseHelper('Anime zostało dodane do listy wstzymanych.'));
    })

    .put('/:userId/planned/:animeId', async (req, res) => {
        const { userId, animeId } = req.params;
        await UserRecord.handlePlanned(userId, animeId);
        res.status(200).json(responseHelper('Anime zostało dodane do listy planowanych.'));
    })

    .put('/:userId/process-of-watching/:animeId', async (req, res) => {
        const { userId, animeId } = req.params;
        await UserRecord.handleProcessOfWatching(userId, animeId);
        res.status(200).json(responseHelper('Anime zostało dodane do listy obecnie oglądanych.'));
    })
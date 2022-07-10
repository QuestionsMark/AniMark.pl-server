import { Router } from "express";
import { sign } from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config";
import { fileUpload, UploadResponse } from "../middlewares/imgUploadWithValidation";
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

    // Pobieranie dostępnych online użytkowników
    .get('/online', async (req, res) => {
        res.status(200).json(responseApiHelper(await UserRecord.getOnline()));
    })


    // Pobieranie konkretnego użytkownika
    .get('/:id', async (req, res) => {
        res.status(200).json(responseApiHelper(await UserRecord.getProfile(req.params.id)));
    })


    // Pobieranie konkretnego użytkownika
    .get('/:id/info', async (req, res) => {
        res.status(200).json(responseApiHelper(await UserRecord.getInfo(req.params.id)));
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
    .get('/:id/achievements', async (req, res) => {
        // res.status(200).json(responseApiHelper(await UserRecord.getAnimeData(req.params.id)));
        res.status(200).json(responseApiHelper(await UserRecord.getAchievements(req.params.id)));
    })

    // Pobieranie ulubionego gatunku użytkownika
    .get('/:id/user-data', async (req, res) => {
        res.status(200).json(responseApiHelper(await UserRecord.getUserData(req.params.id)));
    })

    // Pobieranie tła użytkownika
    .get('/:id/background', async (req, res) => {
        res.status(200).json(responseApiHelper(await UserRecord.getBackground(req.params.id)));
    })


    // Pobieranie tła użytkownika
    .get('/:id/anime-top', pagination('USER_ANIME_TOP'), (req, res: PaginatedResponse) => {
        res.status(200).json(responseApiHelper(res.results, res.amount));
    })


    // Pobieranie prywatnych danych użytkownika
    .get('/:id/privacy', async (req, res) => {
        res.status(200).json(responseApiHelper(await UserRecord.getPrivacy(req.params.id)));
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

    .put('/:userId/avatar', fileUpload(), async (req, res: UploadResponse) => {
        const files = res.uploadedFiles;
        res.status(200).json(responseHelper(await UserRecord.changeAvatar(req.params.userId, files[0])));
    })

    .put('/:userId/privacy', async (req, res) => {
        res.status(200).json(responseHelper(await UserRecord.editPrivacy(req.params.userId, req.body)));
    })

    .put('/:userId/like/:like', async (req, res) => {
        const { userId, like } = req.params;
        res.status(200).json(responseHelper(await UserRecord.likeProfile(userId, like)));
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

    .put('/:userId/background/:backgroundSrc', async (req, res) => {
        const { userId, backgroundSrc } = req.params;
        res.status(200).json(responseHelper(await UserRecord.changeBackground(userId, backgroundSrc)));
    })

    .delete('/:userId/background/:backgroundSrc', async (req, res) => {
        const { userId, backgroundSrc } = req.params;
        res.status(200).json(responseHelper(await UserRecord.deleteBackground(userId, backgroundSrc)));
    })

    .post('/:userId/background', fileUpload(), async (req, res: UploadResponse) => {
        res.status(200).json(responseHelper(await UserRecord.addBackgrounds(req.params.userId, res.uploadedFiles)));
    })

    .patch('/:userId', async (req, res: UploadResponse) => {
        res.status(200).json(responseHelper(await UserRecord.editProfile(req.params.userId, req.body)));
    })
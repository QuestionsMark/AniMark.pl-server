import { Router } from "express";
import { ValidationError } from "../middlewares/error";
import { imgAndAudioUploadWithValidation, ValidationResponse } from "../middlewares/imgUploadWithValidation";
import { PaginatedResponse, pagination } from "../middlewares/pagination";
import { AnimeRecord } from "../records";
import { AnimeCreateEntity } from "../types/formEntities";
import { responseApiHelper, responseHelper } from "../utils/responseHelper";

export const animeRouter = Router();

animeRouter
    // Pobieranie wszystkich anime
    .get('/', pagination("ANIME"), (req, res: PaginatedResponse) => {
        res.status(200).json(responseApiHelper(res.results, res.amount));
    })

    // Pobieranie polecanego anime
    .get('/recommended', async (req, res) => {
        res.status(200).json(responseApiHelper(await AnimeRecord.getRecommended()));
    })


    // Pobieranie listy anime do formularza
    .get('/form', async (req, res) => {
        res.status(200).json(responseApiHelper(await AnimeRecord.getAnimeFormList()));
    })

    // Pobieranie listy anime do formularza
    .get('/seasons-form', pagination('SEASONS_FORM'), async (req, res: PaginatedResponse) => {
        res.status(200).json(responseApiHelper(res.results, res.amount));
    })

    // Pobieranie listy miniaturek anime do formularza
    .get('/images-form', pagination('IMAGES_FORM'), async (req, res: PaginatedResponse) => {
        res.status(200).json(responseApiHelper(res.results, res.amount));
    })

    // Pobieranie listy folderów galerii
    .get('/galery', pagination('GALERY'), async (req, res: PaginatedResponse) => {
        res.status(200).json(responseApiHelper(res.results, res.amount));
    })


    // Pobieranie konkretnego anime
    .get('/:id', async (req, res) => {
        res.status(200).json(responseApiHelper(await AnimeRecord.getOne(req.params.id)));
    })


    // Pobieranie gatunków konkretnego anime
    .get('/:id/types', async (req, res) => {
        res.status(200).json(responseApiHelper(await AnimeRecord.getTypes(req.params.id)));
    })


    // Pobieranie tła konkretnego anime
    .get('/:id/background', async (req, res) => {
        res.status(200).json(responseApiHelper(await AnimeRecord.getBackground(req.params.id)));
    })


    // Dodawanie anime
    .post('/', imgAndAudioUploadWithValidation('ANIME_CREATE'), async (req, res: ValidationResponse, next) => {
        const { data, errors, uploadedFiles } = res.validationResult;
        if (errors.length > 0) throw new ValidationError('Niepoprawne dane!', errors);
        const message = await AnimeRecord.create(data as AnimeCreateEntity, uploadedFiles, next);
        res.status(201).json(responseHelper(message));
    })


    // Dodawanie anime
    .post('/:id/comments', async (req, res) => {
        const { userId, text } = req.body;
        res.status(201).json(responseHelper(await AnimeRecord.newComment(req.params.id, userId, text)));
    })


    // Usuwanie anime
    .delete('/:id', (req, res) => {
        res.end();
    })


    // Usuwanie komentarza nowości
    .delete('/:id/comments/:commentId', async (req, res) => {
        const { commentId, id } = req.params;
        res.status(200).json(responseHelper(await AnimeRecord.deleteComment(id, commentId)));
    })


    // Edytowanie anime
    .patch('/:id', (req, res) => {
        res.end();
    })


    // Zmiana oceny anime
    .put('/:id/rate', async (req, res) => {
        const { rate, userId } = req.body;
        res.status(200).json(responseHelper(await AnimeRecord.newRate(req.params.id, rate, userId)));
    })


    // Zmiana like'a soundtracku anime
    .put('/:id/soundtracks/:soundtrackId/like/:userId', async (req, res) => {
        const { id, soundtrackId, userId } = req.params;
        res.status(200).json(responseHelper(await AnimeRecord.soundtrackLike(id, soundtrackId, userId)));
    })

    // Likeowanie komentarza nowości
    .put('/:id/comments/:commentId/like/:userId', async (req, res) => {
        const { commentId, id, userId } = req.params;
        res.status(200).json(responseHelper(await AnimeRecord.likeComment(id, commentId, userId)));
    })
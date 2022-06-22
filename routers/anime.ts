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
    .get('/:id/types', async (req, res) => {
        res.status(200).json(responseApiHelper(await AnimeRecord.getTypes(req.params.id)));
    })

    // Pobieranie konkretnego anime
    .get('/:id', (req, res) => {
        res.end();
    })


    // Dodawanie anime
    .post('/', imgAndAudioUploadWithValidation('ANIME_CREATE'), async (req, res: ValidationResponse, next) => {
        const { data, errors, uploadedFiles } = res.validationResult;
        if (errors.length > 0) throw new ValidationError('Niepoprawne dane!', errors);
        const message = await AnimeRecord.create(data as AnimeCreateEntity, uploadedFiles, next);
        res.status(201).json(responseHelper(message));
    })


    // Usuwanie anime
    .delete('/:id', (req, res) => {
        res.end();
    })


    // Edytowanie anime
    .patch('/:id', (req, res) => {
        res.end();
    })
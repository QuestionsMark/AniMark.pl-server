import { Router } from "express";
import { ValidationError } from "../middlewares/error";
import { imgUploadWithValidation, ValidationResponse } from "../middlewares/imgUploadWithValidation";
import { PaginatedResponse, pagination } from "../middlewares/pagination";
import { NewsRecord } from "../records";
import { NewsEditEntity, NewsFormEntity } from "../types/formEntities";
import { responseApiHelper, responseHelper } from "../utils/responseHelper";

export const newsRouter = Router();

newsRouter
    // Pobieranie wszystkich nowości
    .get('/', pagination("NEWS"), (req, res: PaginatedResponse) => {
        res.status(200).json(responseApiHelper(res.results, res.amount));
    })


    // Pobieranie ostatnich 5 nowości
    .get('/last', async (req, res) => {
        res.status(200).json(responseApiHelper(await NewsRecord.getLast()));
    })


    // Pobieranie konkretnej nowości
    .get('/:id', async (req, res) => {
        res.status(200).json(responseApiHelper(await NewsRecord.getOne(req.params.id)));
    })


    // Dodawanie nowości
    .post('/', imgUploadWithValidation('NEWS_CREATE'), async (req, res: ValidationResponse) => {
        const { data, errors, uploadedImages } = res.validationResult;
        if (errors.length > 0) throw new ValidationError('Niepoprawne dane!', errors);
        await NewsRecord.create(data as NewsFormEntity, uploadedImages);
        res.status(201).json(responseHelper(`Dodano nowy artykuł.`));
    })


    // Dodawanie komentarza do nowości
    .post('/:id/comments', async (req, res: ValidationResponse) => {
        const { text, userId } = req.body;
        await NewsRecord.newComment(req.params.id, text, userId);
        res.status(201).json(responseHelper(`Dodano nowy komentarz.`));
    })


    // Usuwanie nowości
    .delete('/:id', (req, res) => {
        res.end();
    })

    // Usuwanie komentarza nowości
    .delete('/:id/comments/:commentId', async (req, res) => {
        const { commentId, id } = req.params;
        res.status(200).json(responseHelper(await NewsRecord.deleteComment(id, commentId)));
    })


    // Usuwanie grafiki konkretnej nowości
    .delete('/:id/image/:imageSrc', async (req, res) => {
        const { id, imageSrc } = req.params;
        await NewsRecord.deleteImage(id, imageSrc);
        res.status(200).json(responseHelper('Grafika została usunięta.'));
    })


    // Edytowanie nowości
    .patch('/:id', imgUploadWithValidation('NEWS_EDIT'), async (req, res: ValidationResponse) => {
        const { data, errors, uploadedImages } = res.validationResult;
        if (errors.length > 0) throw new ValidationError('Niepoprawne dane!', errors);
        await NewsRecord.edit(req.params.id, data as NewsEditEntity, uploadedImages);
        res.status(201).json(responseHelper(`Artykuł został zaktualizowany.`));
    })

    // Likeowanie komentarza nowości
    .put('/:id/comments/:commentId/like/:userId', async (req, res) => {
        const { commentId, id, userId } = req.params;
        res.status(200).json(responseHelper(await NewsRecord.likeComment(id, commentId, userId)));
    })
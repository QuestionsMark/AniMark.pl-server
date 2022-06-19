import { Router } from "express";
import { ValidationError } from "../middlewares/error";
import { imgUploadWithValidation, ValidationResponse } from "../middlewares/imgUploadWithValidation";
import { PaginatedResponse, pagination } from "../middlewares/pagination";
import { NewsRecord } from "../records";
import { NewsFormEntity } from "../types/formEntities";
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
        await NewsRecord.bumpViews(req.params.id, req.query.userId as string);
        res.status(200).json(responseApiHelper(await NewsRecord.getOne(req.params.id)));
    })


    // Dodawanie nowości
    .post('/', imgUploadWithValidation('NEWS_CREATE'), async (req, res: ValidationResponse) => {
        const { data, errors, uploaded } = res.validationResult;
        if (errors.length > 0) throw new ValidationError('Niepoprawne dane!', errors);
        await NewsRecord.create(data as NewsFormEntity, uploaded);
        res.status(201).json(responseHelper(`Dodano nowy artykuł.`));
    })


    // Usuwanie nowości
    .delete('/:id', (req, res) => {
        res.end();
    })


    // Edytowanie nowości
    .patch('/:id', (req, res) => {
        res.end();
    })
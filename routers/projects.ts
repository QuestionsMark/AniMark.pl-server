import { Router } from "express";
import { ValidationError } from "../middlewares/error";
import { imgUploadWithValidation, ValidationResponse } from "../middlewares/imgUploadWithValidation";
import { PaginatedResponse, pagination } from "../middlewares/pagination";
import { ProjectRecord } from "../records/project.record";
import { ProjectCreateEntity } from "../types/formEntities";
import { responseApiHelper, responseHelper } from "../utils/responseHelper";

export const projectsRouter = Router();

projectsRouter
    .get('/', pagination('PROJECTS'), (req, res: PaginatedResponse) => {
        res.status(200).json(responseApiHelper(res.results, res.amount));
    })

    .get('/last', async (req, res) => {
        res.status(200).json(responseApiHelper(await ProjectRecord.getLast()));
    })

    .post('/', imgUploadWithValidation('PROJECT_CREATE'), async (req, res: ValidationResponse) => {
        const { data, errors, uploadedImages } = res.validationResult;
        if (errors.length > 0) throw new ValidationError('Niepoprawne dane!', errors);
        await ProjectRecord.create(data as ProjectCreateEntity, uploadedImages);
        res.status(201).json(responseHelper(`Dodano nowy projekt.`));
    })
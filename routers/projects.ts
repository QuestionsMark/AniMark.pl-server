import { Router } from "express";
import { PaginatedResponse, pagination } from "../middlewares/pagination";
import { responseApiHelper } from "../utils/responseHelper";

export const projectsRouter = Router();

projectsRouter
    .get('/', pagination('PROJECTS'), (req, res: PaginatedResponse) => {
        res.status(200).json(responseApiHelper(res.results, res.amount));
    })
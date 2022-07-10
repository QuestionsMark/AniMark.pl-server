import { Router } from "express";
import { PaginatedResponse, pagination } from "../middlewares/pagination";
import { responseApiHelper } from "../utils/responseHelper";

export const cityDefenceRouter = Router();

cityDefenceRouter
    // Pobieranie wszystkich CityDefenceResult
    .get('/', pagination("CITY_DEFENCE"), (req, res: PaginatedResponse) => {
        res.status(200).json(responseApiHelper(res.results, res.amount));
    })


    // Dodawanie CityDefenceResult
    .post('/', (req, res) => {
        res.end();
    })


    // Usuwanie CityDefenceResult
    .delete('/:id', (req, res) => {
        res.end();
    })
import { NextFunction, Request, Response } from "express";
import { Achievement } from "../models/achievements";
import { Anime } from "../models/anime";
import { AnimeOnTop } from "../models/animeOnTop";
import { News } from "../models/news";
import { SwordArtOnlineResult } from "../models/swordArtOnlineResults";
import { Type } from "../models/types";
import { User } from "../models/users";
import { WhatsTheMelody } from "../models/whatsTheMelody";
import { AchievementAPI, AnimeAPI, AnimeOnTopAPI, NewsAPI, SwordArtOnlineResultAPI, TypeAPI, UserAPI, WhatsTheMelodyAPI } from "../types";

export interface PaginatedResponse extends Response {
    results: AchievementAPI[] | AnimeAPI[] | AnimeOnTopAPI[] | NewsAPI[] | SwordArtOnlineResultAPI[] | TypeAPI[] | UserAPI[] | WhatsTheMelodyAPI[];
    amount: number;
}

type Collection = 'ACHIEVEMENTS' | 'ANIME' | 'ANIME_ON_TOP' | 'NEWS' | 'SWORD_ART_ONLINE_RESULTS' | 'TYPES' | 'USERS' | 'WHATS_THE_MELODY';

export function pagination(collection: Collection) {
    return async (req: Request, res: PaginatedResponse, next: NextFunction) => {
        try {
            const page = isNaN(Number(req.query.page)) ? 1 : Number(req.query.page);
            const limit = isNaN(Number(req.query.limit)) ? 0 : Number(req.query.limit);
            const searchPhrase = req.query.search ? new RegExp(req.query.search as string, 'gi') : new RegExp('.', 'gi');
            const startIndex = (page - 1) * limit;

            switch (collection) {
                case 'ACHIEVEMENTS': {
                    res.results = await Achievement.find({ "x": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "x": 1 });
                    res.amount = await Achievement.countDocuments().where({ "name": { $regex: searchPhrase } });
                    break;
                }

                case 'ANIME': {
                    res.results = await Anime.find({ "x": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "x": 1 });
                    res.amount = await Anime.countDocuments().where({ "name": { $regex: searchPhrase } });
                    break;
                }

                case 'ANIME_ON_TOP': {
                    res.results = await AnimeOnTop.find({ "x": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "x": 1 });
                    res.amount = await AnimeOnTop.countDocuments().where({ "name": { $regex: searchPhrase } });
                    break;
                }

                case 'NEWS': {
                    res.results = await News.find({ "x": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "x": 1 });
                    res.amount = await News.countDocuments().where({ "name": { $regex: searchPhrase } });
                    break;
                }

                case 'SWORD_ART_ONLINE_RESULTS': {
                    res.results = await SwordArtOnlineResult.find({ "x": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "x": 1 });
                    res.amount = await SwordArtOnlineResult.countDocuments().where({ "name": { $regex: searchPhrase } });
                    break;
                }

                case 'TYPES': {
                    res.results = await Type.find({ "x": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "x": 1 });
                    res.amount = await Type.countDocuments().where({ "name": { $regex: searchPhrase } });
                    break;
                }

                case 'USERS': {
                    res.results = await User.find({ "x": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "x": 1 });
                    res.amount = await User.countDocuments().where({ "name": { $regex: searchPhrase } });
                    break;
                }

                case 'WHATS_THE_MELODY': {
                    res.results = await WhatsTheMelody.find({ "x": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "x": 1 });
                    res.amount = await WhatsTheMelody.countDocuments().where({ "name": { $regex: searchPhrase } });
                    break;
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}
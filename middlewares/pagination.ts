import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { Achievement } from "../models/achievements";
import { Anime } from "../models/anime";
import { AnimeOnTop } from "../models/animeOnTop";
import { News } from "../models/news";
import { Project } from "../models/projects";
import { SwordArtOnlineResult } from "../models/swordArtOnlineResults";
import { Type } from "../models/types";
import { User } from "../models/users";
import { WhatsTheMelody } from "../models/whatsTheMelody";
import { AchievementAPI, AnimeAPI, AnimeCondensedAPI, AnimeFilters, AnimeOnTopAPI, AnimePopulateAPI, Kind, NewsAPI, Sort, SwordArtOnlineResultAPI, TypeAPI, UserAPI, WhatsTheMelodyAPI } from "../types";

export interface PaginatedResponse extends Response {
    results: AchievementAPI[] | AnimeCondensedAPI[] | AnimeOnTopAPI[] | NewsAPI[] | SwordArtOnlineResultAPI[] | TypeAPI[] | UserAPI[] | WhatsTheMelodyAPI[];
    amount: number;
}

type Collection = 'ACHIEVEMENTS' | 'ANIME' | 'ANIME_ON_TOP' | 'NEWS' | 'SWORD_ART_ONLINE_RESULTS' | 'TYPES' | 'USERS' | 'WHATS_THE_MELODY' | 'PROJECTS';

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

                    const sortBy = (sort: Sort) => {
                        switch (sort) {
                            case 'alphabetic':
                                return { "title": 1 };

                            case 'best':
                                return { "averageRate": -1 };

                            case 'new':
                                return { "createdAt": -1 };

                            case 'old':
                                return { "createdAt": 1 };

                            case 'worst':
                                return { "averageRate": 1 };

                            default:
                                return { "title": 1 };
                        }
                    };

                    const getFilters = (filtersObject: AnimeFilters): any[] => {
                        const { kind, maxRate, minRate, unwantedTypes, wantedTypes } = filtersObject;

                        const filters: any[] = [];

                        switch (kind) {
                            case 'all':
                                break;
                            default:
                                filters.push({ "kind": kind });
                                break;
                        }

                        if (maxRate) {
                            filters.push({ "averageRate": { $lte: maxRate } });
                        }
                        if (minRate) {
                            filters.push({ "averageRate": { $gte: minRate } });
                        }

                        if (wantedTypes.length > 0) {
                            for (const type of wantedTypes) {
                                filters.push({ "types": { $in: [new Types.ObjectId(type)] } });
                            }
                        }

                        if (unwantedTypes.length > 0) {
                            for (const type of unwantedTypes) {
                                filters.push({ "types": { $nin: [new Types.ObjectId(type)] } });
                            }
                        }
                        return filters.length > 0 ? filters : [{ "title": { $regex: searchPhrase } }];
                    };

                    const { maxRate, minRate, sort, unwantedTypes, wantedTypes, kind } = req.query;
                    const filters: AnimeFilters = {
                        maxRate: maxRate ? Number(maxRate) : null,
                        minRate: minRate ? Number(minRate) : null,
                        unwantedTypes: JSON.parse(unwantedTypes as string),
                        wantedTypes: JSON.parse(wantedTypes as string),
                        kind: kind as Kind,
                    };

                    const anime = await Anime.find({ "title": { $regex: searchPhrase }, $and: getFilters(filters) }).limit(limit).skip(startIndex).sort(sortBy(sort as Sort)).select('averageRate').select('images').select('kind').select('title').select('types').populate('types');
                    res.amount = await Anime.countDocuments().where({ $and: [{ "title": { $regex: searchPhrase } }, ...getFilters(filters)] });
                    res.results = (anime as AnimePopulateAPI[]).map(({ _id, averageRate, images, kind, title, types }) => ({
                        _id,
                        averageRate,
                        image: images.mini,
                        kind,
                        title,
                        types,
                    }));
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

                case 'PROJECTS': {
                    res.results = await Project.find({ "name": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "createdAt": -1 });
                    res.amount = await Project.countDocuments().where({ "name": { $regex: searchPhrase } });
                    break;
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}
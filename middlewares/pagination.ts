import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { Achievement } from "../models/achievements";
import { Anime } from "../models/anime";
import { AnimeOnTop } from "../models/animeOnTop";
import { CityDefenceResult } from "../models/cityDefenceResults";
import { News } from "../models/news";
import { Project } from "../models/projects";
import { SwordArtOnlineResult } from "../models/swordArtOnlineResults";
import { Type } from "../models/types";
import { User } from "../models/users";
import { WhatsTheMelody } from "../models/whatsTheMelody";
import { AchievementAPI, AchievementsGroup, AnimeAPI, AnimeFilters, AnimePopulateAPI, CityDefenceSort, ComplexTypeAPI, Kind, NewsAPI, NewsCondensedAPI, SAOCSort, Sort, TypeAPI, UserAPI, UserPopulateAPI } from "../types";

export interface PaginatedResponse extends Response {
    results: any[];
    amount: number;
}

type Collection = 'ACHIEVEMENTS' | 'ANIME' | 'ANIME_ON_TOP' | 'NEWS' | 'SWORD_ART_ONLINE_CLICKER' | 'TYPES' | 'USERS' | 'WHATS_THE_MELODY' | 'PROJECTS' | 'IMAGES_FORM' | 'GALERY' | 'USER_ANIME_TOP' | 'SEASONS_FORM' | 'CITY_DEFENCE';

export function pagination(collection: Collection) {
    return async (req: Request, res: PaginatedResponse, next: NextFunction) => {
        try {
            const page = isNaN(Number(req.query.page)) ? 1 : Number(req.query.page);
            const limit = isNaN(Number(req.query.limit)) ? 0 : Number(req.query.limit);
            const searchPhrase = req.query.search ? new RegExp(req.query.search as string, 'gi') : new RegExp('.', 'gi');
            const startIndex = (page - 1) * limit;

            switch (collection) {
                case 'ACHIEVEMENTS': {
                    const achievements = await Achievement.find({ "name": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "name": 1 }) as AchievementAPI[];
                    const groups = achievements.reduce((p, a) => {
                        const groupIndex = p.findIndex(g => g.name === a.name);
                        const isGroup = groupIndex !== -1;
                        if (isGroup) {
                            const newP = [...p];
                            newP[groupIndex].items.push(a);
                            return newP;
                        }
                        return [...p, { name: a.name, items: [a] }];
                    }, [] as AchievementsGroup[]);
                    res.results = groups.map(({ items, name }) => ({ items: items.sort((a, b) => a.level - b.level), name }));
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
                    const news: NewsAPI[] = await News.find({ "title": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "createdAt": -1 });
                    res.results = news.map(({ _id, comments, createdAt, description, images, title, viewers, views }) => ({
                        _id,
                        comments: comments.length,
                        createdAt,
                        description,
                        imageSrc: images[0],
                        title,
                        viewers,
                        views,
                    })) as NewsCondensedAPI[];
                    res.amount = await News.countDocuments().where({ "title": { $regex: searchPhrase } });
                    break;
                }

                case 'SWORD_ART_ONLINE_CLICKER': {

                    const sortBy = (sort: SAOCSort) => {
                        switch (sort) {
                            case 'time':
                                return { "completionTime": 1 };

                            case 'achievements':
                                return { "achievements": -1 };

                            case 'level':
                                return { "lvl": 1 };

                            case 'swords':
                                return { "swords": 1 };

                            case 'username':
                                return { "username": 1 };
                        }
                    };

                    const { rankingSort } = req.query;
                    res.results = await SwordArtOnlineResult.find({ "username": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort(sortBy(rankingSort as SAOCSort));
                    res.amount = await SwordArtOnlineResult.countDocuments().where({ "username": { $regex: searchPhrase } });
                    break;
                }

                case 'CITY_DEFENCE': {
                    const sortBy = (sort: CityDefenceSort) => {
                        switch (sort) {
                            case 'accuracy':
                                return { "accuracy": -1 };

                            case 'date':
                                return { "createdAt": -1 };

                            case 'overall':
                                return { "points": -1, "accuracy": -1 };

                            case 'points':
                                return { "points": -1 };

                            case 'username':
                                return { "username": 1 };
                        }
                    };

                    const { rankingSort } = req.query;
                    res.results = await CityDefenceResult.find({ "username": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort(sortBy(rankingSort as CityDefenceSort));
                    res.amount = await CityDefenceResult.countDocuments().where({ "username": { $regex: searchPhrase } });
                    break;
                }

                case 'TYPES': {
                    const types = await Type.find({ "name": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "name": 1 }) as TypeAPI[];
                    const complexTypes: ComplexTypeAPI[] = [];
                    for (const { _id, name } of types) {
                        const anime = await Anime.find({ "types": { $in: [new Types.ObjectId(_id)] } }).limit(3).sort({ averageRate: -1 }).select('images.mini').select('title').select('averageRate') as AnimePopulateAPI[];
                        const lovers = await User.find({ favoriteType: new Types.ObjectId(_id) }).limit(3).sort({ sumOfPoints: -1 }).select('username').select('avatar') as UserAPI[];
                        const animeCount = await Anime.countDocuments().where({ "types": { $in: [new Types.ObjectId(_id)] } });
                        complexTypes.push({
                            _id,
                            animeCount,
                            bestAnime: anime.map(a => ({ anime: { _id: a._id, image: a.images.mini, title: a.title }, rate: a.averageRate })),
                            lovers,
                            name,
                        });
                    }
                    res.results = complexTypes;
                    res.amount = await Type.countDocuments().where({ "name": { $regex: searchPhrase } });
                    break;
                }

                case 'USERS': {
                    const users: UserPopulateAPI[] = await User.find({ "username": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "sumOfPoints": -1 }).select('username').select('avatar').select('background').select('likes').select('achievements').select('sumOfPoints').select('introduction').select('favoriteAnime').select('favoriteType').populate('achievements').populate('favoriteAnime.anime', ['title', 'images']).populate('favoriteType', ['name']);
                    // Drugie sortowanie po ilości lajków
                    // const sorted = users.sort((a, b) => {
                    //     if (a.likes.length > b.likes.length) return -1;
                    //     if (a.likes.length < b.likes.length) return 1;
                    //     return 0;
                    // });
                    res.results = users.map(({ _id, achievements, avatar, background, favoriteAnime, favoriteType, introduction, likes, sumOfPoints, username }) => ({
                        _id,
                        achievements,
                        avatar,
                        background,
                        favoriteAnime: favoriteAnime.map(a => ({
                            anime: {
                                _id: a.anime._id,
                                title: a.anime.title,
                                image: a.anime.images.mini,
                            },
                        })),
                        favoriteType: favoriteType ? favoriteType.name : null,
                        introduction,
                        likes,
                        sumOfPoints,
                        username,
                    }));
                    res.amount = await User.countDocuments().where({ "username": { $regex: searchPhrase } });
                    break;
                }

                case 'WHATS_THE_MELODY': {
                    res.results = await WhatsTheMelody.find({ "correctAnswear": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "createdAt": -1 });
                    res.amount = await WhatsTheMelody.countDocuments().where({ "correctAnswear": { $regex: searchPhrase } });
                    break;
                }

                case 'PROJECTS': {
                    res.results = await Project.find({ "name": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "createdAt": -1 });
                    res.amount = await Project.countDocuments().where({ "name": { $regex: searchPhrase } });
                    break;
                }

                case 'IMAGES_FORM': {
                    const anime: AnimeAPI[] = await Anime.find({ "title": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "title": 1 }).select('images');
                    res.results = anime.map(a => a.images.mini);
                    res.amount = await Anime.countDocuments().where({ "title": { $regex: searchPhrase } });
                    break;
                }

                case 'GALERY': {
                    const anime: AnimeAPI[] = await Anime.find({ "title": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "title": 1 }).select('images').select('title');
                    res.results = anime.map(a => {

                        const { background, baner, galeryImages, mini } = a.images;

                        return {
                            _id: a._id,
                            images: [background, baner, mini, ...galeryImages.filter(i => !([baner.src, background.src, mini.src].includes(i.src)))],
                            title: a.title,
                        };
                    });
                    res.amount = await Anime.countDocuments().where({ "title": { $regex: searchPhrase } });
                    break;
                }

                case 'USER_ANIME_TOP': {
                    const user: any = await User
                        .findById(req.params.id)
                        .select('userAnimeData.watched')
                        .populate('userAnimeData.watched.anime', ['kind', 'title', 'types', 'averageRate', 'images'])
                        .populate('userAnimeData.watched.anime.types');
                    if (!user) return;
                    const anime = (user.userAnimeData.watched as any[]).filter(a => a.anime.title.match(searchPhrase));
                    res.results = anime
                        .sort((a, b) => {
                            if (a.rate > b.rate) return -1;
                            if (a.rate < b.rate) return 1;
                            return 0;
                        })
                        .slice(startIndex, startIndex + limit)
                        .map(({ anime, rate }) => ({
                            anime: {
                                _id: anime._id,
                                kind: anime.kind,
                                title: anime.title,
                                types: anime.types,
                                averageRate: anime.averageRate,
                                image: anime.images.mini,
                            },
                            rate,
                        }));
                    res.amount = anime.length;
                    break;
                }

                case 'SEASONS_FORM': {
                    res.results = await Anime.find({ "title": { $regex: searchPhrase } }).limit(limit).skip(startIndex).sort({ "title": 1 }).select('title');
                    res.amount = await Anime.countDocuments().where({ "title": { $regex: searchPhrase } });
                    break;
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}
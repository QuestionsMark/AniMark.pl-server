import { Anime } from "../models/anime";
import { AnimeAPI, AnimeDescription, AnimeInfo, Comment, AnimeImagesObject, Rate, RecommendedAnimeAPI, Soundtrack, AnimePopulateAPI, AnimeForm, Kind } from "../types";

export class AnimeRecord implements AnimeAPI {
    _id: string;
    kind: Kind;
    title: string;
    watchLink: string;
    info: AnimeInfo;
    types: string[];
    rate: Rate[];
    averageRate: number;
    likes: string[];
    images: AnimeImagesObject;
    soundtracks: Soundtrack[];
    description: AnimeDescription;
    seasons: string[];
    comments: Comment[];
    createdAt: Date;
    constructor(

    ) {

    }

    static async getRecommended(): Promise<RecommendedAnimeAPI | null> {
        const animeLength = await Anime.countDocuments();
        const index = Math.floor(Math.random() * animeLength);
        const recommendedArr: AnimePopulateAPI[] = await Anime.find().skip(index).limit(1).populate('types', ['_id', 'name']);
        if (!(recommendedArr.length > 0)) return null;
        // console.log('Recommended array: ', recommendedArr);

        const { _id, averageRate, description, images, kind, likes, soundtracks, title, types } = recommendedArr[0];
        return { _id, averageRate, description: description.description, image: images.mini, kind, likes: likes as any, soundtrackSrc: soundtracks[0] ? soundtracks[0].src : '', title, types };
    };

    static async getAnimeFormList(): Promise<AnimeForm[]> {
        return Anime.find().select('title').sort({ 'title': 1 });
    }
}
import { Anime } from "../models/anime";
import { AnimeAPI, AnimeDescription, AnimeInfo, Comment, ImagesObject, Rate, RecommendedAnime, Soundtrack, TypeAPI, UserAPI } from "../types";

export class AnimeRecord implements AnimeAPI {
    _id: string;
    kind: "movie" | "series";
    title: string;
    watchLink: string;
    info: AnimeInfo;
    types: TypeAPI[];
    rates: Rate[];
    averageRate: number;
    likes: UserAPI[];
    images: ImagesObject;
    soundtracks: Soundtrack[];
    description: AnimeDescription;
    seasons: AnimeAPI[];
    comments: Comment[];
    createdAt: Date;
    constructor(

    ) {

    }

    static async getRecommended(): Promise<RecommendedAnime | null> {
        const animeLength = await Anime.countDocuments();
        const index = Math.floor(Math.random() * animeLength);
        const recommendedArr: AnimeAPI[] = await Anime.find().skip(index).limit(1).populate('types', ['_id', 'name']);
        if (!(recommendedArr.length > 0)) return null;
        const { _id, averageRate, description, images, kind, likes, soundtracks, title, types } = recommendedArr[0];
        return { _id, averageRate, description: description.description, image: images.mini, kind, likes: likes as any, soundtrackSrc: soundtracks[0].src ? soundtracks[0].src : '', title, types };
    };
}
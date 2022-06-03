import { Anime } from "../models/anime";
import { AnimeAPI, AnimeDescription, AnimeInfo, Comment, ImagesObject, Rate, Soundtrack, TypeAPI, UserAPI } from "../types";

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

    static async getRecommended(): Promise<AnimeAPI | null> {
        const animeLength = await Anime.countDocuments();
        const index = Math.floor(Math.random() * animeLength);
        const recommended = await Anime.find().skip(index).limit(1);
        return recommended.length > 0 ? recommended[0] : null;
    };
}
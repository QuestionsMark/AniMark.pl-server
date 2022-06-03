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
}
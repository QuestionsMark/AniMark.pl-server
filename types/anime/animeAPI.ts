import { Comment, Rate, Soundtrack } from "../common";
import { TypeAPI } from "../types";
import { UserAPI } from "../users";

type Kind = "movie" | "series";

interface AnimeInfo {
    scenario: string;
    productionYear: number;
    duration: string;
}

interface AnimeImage {
    src: string;
    fromAnime: string;
}

interface ImagesObject {
    background: AnimeImage;
    baner: AnimeImage;
    mini: AnimeImage;
    galeryImages: AnimeImage[];
}

interface AnimeDescription {
    author: UserAPI;
    description: string;
    createdAt: Date;
}

export interface AnimeAPI {
    _id: string;
    kind: Kind;
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
}
import { AnimeSeason } from "../anime";

export interface TypeAPI {
    _id: string;
    name: string;
    description: string;
}

export interface TypeLoverAPI {
    _id: string;
    avatar: string;
    username: string;
}

export interface TypeFormListAPI {
    _id: string;
    name: string;
}

export interface ComplexTypeAPI {
    _id: string;
    name: string;
    animeCount: number;
    lovers: TypeLoverAPI[];
    bestAnime: {
        anime: AnimeSeason;
        rate: number;
    }[];
}

export interface TypePageAPI {
    _id: string;
    description: string;
    name: string;
    animeCount: number;
    lovers: TypeLoverAPI[];
    bestAnime: {
        anime: AnimeSeason;
        rate: number;
    }[];
}
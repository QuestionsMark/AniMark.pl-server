import { AnimeDescriptionPopulate, AnimeImage, AnimeSeason } from "../anime/animeAPI";
import { Soundtrack } from "../common";
import { TypeAPI } from "../types";

export interface AOTVote {
    title: string;
    votes: string[];
}

export interface AnimeOnTopAPI {
    _id: string;
    votes: AOTVote[];
    winner: string | null;
    createdAt: Date;
}

export interface AnimeOnTopPopulateAPI {
    _id: string;
    votes: AOTVote[];
    winner: AnimeOnTopWinnerAPI | null;
    createdAt: Date;
}

export interface AnimeOnTopWinnerAPI {
    _id: string;
    image: AnimeImage;
    averageRate: number;
    likes: number;
    title: string;
    types: TypeAPI[];
    description: AnimeDescriptionPopulate;
    soundtracks: Soundtrack[];
    watchLink: string;
    seasons: AnimeSeason[];
}
import { AnimeDescription, AnimeImage, AnimeSeason } from "../anime/animeAPI";
import { Soundtrack } from "../common";
import { TypeAPI } from "../types";
import { UserAPI } from "../users";

export interface AOTVote {
    title: string;
    votes: UserAPI[];
}

export interface AnimeOnTopAPI {
    _id: string;
    votes: AOTVote[];
    winner: string;
    createdAt: Date;
}

export interface AnimeOnTopPopulateAPI {
    _id: string;
    votes: AOTVote[];
    winner: AnimeOnTopWinnerAPI;
    createdAt: Date;
}

export interface AnimeOnTopWinnerAPI {
    _id: string;
    image: AnimeImage;
    averageRate: number;
    likes: string[];
    title: string;
    types: TypeAPI[];
    description: AnimeDescription;
    soundtracks: Soundtrack[];
    watchLink: string;
    seasons: AnimeSeason[];
}
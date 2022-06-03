import { AnimeAPI } from "../anime/animeAPI";
import { UserAPI } from "../users";

export interface AOTVote {
    title: string;
    votes: UserAPI[];
}

export interface AnimeOnTopAPI {
    _id: string;
    votes: AOTVote;
    winner: AnimeAPI;
    createdAt: Date;
}
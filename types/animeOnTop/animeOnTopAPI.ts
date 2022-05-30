import { AnimeAPI } from "../anime/animeAPI";
import { UserAPI } from "../users";

interface AOTVote {
    title: string;
    votes: UserAPI[];
}

export interface AnimeOnTopAPI {
    _id: string;
    votes: AOTVote;
    winner: AnimeAPI;
    createdAt: Date;
}
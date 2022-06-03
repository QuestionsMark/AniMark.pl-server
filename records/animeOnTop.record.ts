import { AnimeAPI, AnimeOnTopAPI, AOTVote } from "../types";

export class AnimeOnTopRecord implements AnimeOnTopAPI {
    _id: string;
    votes: AOTVote;
    winner: AnimeAPI;
    createdAt: Date;
    constructor(

    ) {

    }
}
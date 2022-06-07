import { AnimeOnTopAPI, AOTVote } from "../types";

export class AnimeOnTopRecord implements AnimeOnTopAPI {
    _id: string;
    votes: AOTVote[];
    winner: string;
    createdAt: Date;
    constructor(

    ) {

    }
}
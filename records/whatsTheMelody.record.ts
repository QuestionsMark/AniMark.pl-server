import { Comment, WhatsTheMelodyAPI, WTMVotes } from "../types";

export class WhatsTheMelodyRecord implements WhatsTheMelodyAPI {
    _id: string;
    src: string;
    answears: string[];
    correctAnswear: string;
    votes: WTMVotes[];
    comments: Comment[];
    createdAt: Date;
    constructor(

    ) {

    }
}
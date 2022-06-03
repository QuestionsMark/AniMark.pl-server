import { WhatsTheMelody } from "../models/whatsTheMelody";
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

    static async getActual(): Promise<WhatsTheMelodyAPI | null> {
        const wtmLength = await WhatsTheMelody.countDocuments();
        const actual = await WhatsTheMelody.find().skip(wtmLength > 0 ? wtmLength - 1 : wtmLength);
        return actual.length > 0 ? actual[0] : null;
    };

    static async getActualComments(): Promise<Comment[] | null> {
        const wtmLength = await WhatsTheMelody.countDocuments();
        const actual: WhatsTheMelodyAPI[] = await WhatsTheMelody.find().skip(wtmLength > 0 ? wtmLength - 1 : wtmLength);
        return actual.length > 0 ? actual[0].comments : null;
    };
}
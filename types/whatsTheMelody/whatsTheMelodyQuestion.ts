import { WTMVotes } from "./whatsTheMelodyAPI";

export interface WhatsTheMelodyQuestion {
    _id: string;
    src: string;
    answears: string[];
    votes: WTMVotes[];
}

export interface NewVote {
    token: string;
    wtmId: string;
    vote: string;
}
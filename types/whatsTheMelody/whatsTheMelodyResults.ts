import { WTMVotes } from "./whatsTheMelodyAPI";

export interface WhatsTheMelodyResults {
    _id: string;
    src: string;
    correctAnswear: string;
    votes: WTMVotes[];
}

export interface VoteResultsAPI {
    isFail: boolean;
    percent: string;
    title: string;
    votesAmount: number;
}
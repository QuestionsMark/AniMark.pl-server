import { WTMVotes } from "./whatsTheMelodyAPI";

export interface WhatsTheMelodyResults {
    _id: string;
    src: string;
    correctAnswear: string;
    votes: WTMVotes[];
}
import { Comment } from "../common";
import { UserAPI } from "../users";

interface WTMVotes {
    title: string;
    votes: UserAPI[];
}

export interface WhatsTheMelodyAPI {
    _id: string;
    src: string;
    answears: string[];
    correctAnswear: string;
    votes: WTMVotes[];
    comments: Comment[];
    createdAt: Date;
}
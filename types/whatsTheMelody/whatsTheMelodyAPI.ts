import { Comment, CommentPopulate, Soundtrack } from "../common";
import { UserAPI } from "../users";

export interface WTMVotes {
    title: string;
    votes: string[];
}
// export interface WTMVotesPopulate {
//     title: string;
//     votes: UserAPI[];
// }

export interface WhatsTheMelodyAPI {
    _id: string;
    src: string;
    answears: string[];
    correctAnswear: string;
    votes: WTMVotes[];
    comments: Comment[];
    createdAt: Date;
}

export interface WhatsTheMelodyCondensedAPI {
    _id: string;
    src: string;
    answears: string[];
    correctAnswear: string;
    votes: WTMVotes[];
    comments: CommentPopulate[];
    createdAt: Date;
}

export interface WhatsTheMelodyCandidateAPI {
    _id: string;
    soundtracks: Soundtrack[];
    title: string;
}
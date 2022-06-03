import { Comment } from "../common";
import { UserAPI } from "../users";

export interface OtherLink {
    link: string;
    note: string;
}

export interface NewsAPI {
    _id: string;
    title: string;
    description: string;
    images: {
        src: string;
    }[];
    videos: {
        src: string;
    }[];
    otherLinks: OtherLink[];
    views: number;
    viewers: UserAPI[];
    comments: Comment[];
    createdAt: Date;
}

export interface NewsAPICondensed {
    _id: string;
    title: string;
    description: string;
    imageSrc: string;
    views: number;
    viewers: string[];
    comments: Number;
    createdAt: Date;
}
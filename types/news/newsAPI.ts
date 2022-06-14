import { Comment, CommentPopulate } from "../common";

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
    viewers: string[];
    comments: CommentPopulate[];
    createdAt: Date;
}

export interface NewsCondensedAPI {
    _id: string;
    title: string;
    description: string;
    imageSrc: string;
    views: number;
    viewers: string[];
    comments: number;
    createdAt: Date;
}
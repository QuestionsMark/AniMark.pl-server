import { CommentPopulate } from "../common";
import { OtherLink } from "../formEntities";

export interface PublicFile {
    src: string;
}

export interface NewsAPI {
    _id: string;
    title: string;
    description: string;
    images: string[];
    videos: string[];
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
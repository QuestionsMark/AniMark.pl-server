import { Comment, NewsAPI, OtherLink, UserAPI } from "../types";

export class NewsRecord implements NewsAPI {
    _id: string;
    title: string;
    description: string;
    images: { src: string; }[];
    videos: { src: string; }[];
    otherLinks: OtherLink[];
    views: number;
    viewers: UserAPI[];
    comments: Comment[];
    createdAt: Date;
    constructor(

    ) {

    }
}
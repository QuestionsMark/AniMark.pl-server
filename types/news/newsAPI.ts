import { Comment } from "../common";
import { UserAPI } from "../users";

interface OtherLink {
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
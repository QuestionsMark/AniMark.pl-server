import { UserAPI } from "../users";
import { Collection } from "./collection";

export interface Comment {
    id: string;
    user: string;
    createdAt: Date;
    text: string;
    likes: string[];
}

export interface CommentPopulate {
    id: string;
    user: {
        _id: string;
        username: string;
        avatar: string;
    };
    createdAt: Date;
    text: string;
    likes: string[];
}

export interface NewComment {
    collection: Collection;
    collectionId: string;
    text: string;
    token: string;
}

export interface UpdateComment {
    collection: Collection;
    collectionId: string;
    commentId: string;
    token: string;
}
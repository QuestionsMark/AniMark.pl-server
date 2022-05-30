import { UserAPI } from "../users";

export interface Comment {
    user: UserAPI;
    createdAt: Date;
    text: string;
    likes: UserAPI[];
}
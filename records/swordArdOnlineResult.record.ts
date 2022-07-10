import { SwordArtOnlineResultAPI } from "../types";

export class SwordArtOnlineResultRecord implements SwordArtOnlineResultAPI {
    _id: string;
    username: string;
    completionTime: string;
    lvl: number;
    achievements: number;
    swords: number;
    createdAt: Date;
    constructor(

    ) {

    }
}
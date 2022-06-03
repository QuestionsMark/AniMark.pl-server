import { AchievementAPI } from "../types";

export class AchievementRecord implements AchievementAPI {
    _id: string;
    name: string;
    description: string;
    level: number;
    title: string;
    points: number;
    icon: string;
    createdAt: Date;
    constructor(

    ) {

    }
}
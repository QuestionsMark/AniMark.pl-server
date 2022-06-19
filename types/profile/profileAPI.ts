import { AchievementAPI } from "../achievements";
import { TypeAPI } from "../types";
import { FavoriteAnimeCondensed, Introduction, Points, UserAnimeDataCondensedAPI } from "../users";

export interface ProfileAPI {
    _id: string;
    avatar: string;
    background: string;
    username: string;
    likes: string[];
    achievements: AchievementAPI[];
    favoriteType: TypeAPI;
    createdAt: Date;
    rank: number;
    points: Points;
    sumOfPoints: number;
    introduction: Introduction;
    userAnimeData: UserAnimeDataCondensedAPI;
    favoriteAnime: FavoriteAnimeCondensed[];
    timeSpentWithAnime: number;
}
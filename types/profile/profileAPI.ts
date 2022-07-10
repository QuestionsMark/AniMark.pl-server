import { AchievementAPI } from "../achievements";
import { AnimeCondensedAPI } from "../anime";
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
    customBackgrounds: string[];
    timeSpentWithAnime: number;
}

export interface ProfileAnimeAPI {
    anime: AnimeCondensedAPI;
    rate: number;
}

export interface PrivacyAPI {
    email: string;
    login: string;
}
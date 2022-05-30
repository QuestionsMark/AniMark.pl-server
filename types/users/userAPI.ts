import { AchievementAPI } from "../achievements";
import { AnimeAPI } from "../anime";
import { TypeAPI } from "../types";

interface Points {
    watchedAnime: number;
    comments: number;
    descriptions: number;
    profileLikes: number;
    soundtrackLikes: number;
    accountTime: number;
    animeOnTop: number;
    whatsTheMelody: number;
}

interface WatchedAnime {
    anime: AnimeAPI;
    rate: number;
}

interface UserAnimeData {
    planned: AnimeAPI[];
    processOfWatching: AnimeAPI[];
    stopped: AnimeAPI[];
    watched: WatchedAnime[];
}

interface Introduction {
    title: string;
    description: string;
}

interface FavoriteAnime {
    anime: AnimeAPI;
    rate: number;
}

export interface UserAPI {
    _id: string;
    email: string;
    login: string;
    password: string;
    rank: number;
    username: string;
    avatar: string;
    background: string;
    customBackgrounds: {
        src: string;
    }[];
    likes: UserAPI[];
    achievements: AchievementAPI[];
    points: Points;
    userAnimeData: UserAnimeData;
    introduction: Introduction;
    favoriteAnime: FavoriteAnime[];
    favoriteType: TypeAPI;
    createdAt: Date;
}
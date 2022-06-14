export enum RoleEnum {
    User,
    Moderator,
    Admin,
}

export interface Points {
    watchedAnime: number;
    comments: number;
    descriptions: number;
    profileLikes: number;
    soundtrackLikes: number;
    accountTime: number;
    animeOnTop: number;
    whatsTheMelody: number;
}

export interface WatchedAnime {
    anime: string;
    rate: number;
}

export interface UserAnimeData {
    planned: string[];
    processOfWatching: string[];
    stopped: string[];
    watched: WatchedAnime[];
}

export interface Introduction {
    title: string;
    description: string;
}

export interface FavoriteAnime {
    anime: string;
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
    likes: string[];
    achievements: string[];
    points: Points;
    userAnimeData: UserAnimeData;
    introduction: Introduction;
    favoriteAnime: FavoriteAnime[];
    favoriteType: string;
    createdAt: Date;
}

export interface RecommendedProfileAPI {
    _id: string;
    username: string;
    points: Points;
    likes: string[];
    avatar: string;
    background: string;
}

export interface UserDataAPI {
    userAnimeData: UserAnimeData;
    favoriteAnime: FavoriteAnime[];
    favoriteType: string;
}
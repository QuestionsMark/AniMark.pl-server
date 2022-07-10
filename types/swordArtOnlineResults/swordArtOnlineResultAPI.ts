export interface SwordArtOnlineResultAPI {
    _id: string;
    username: string;
    completionTime: string;
    lvl: number;
    achievements: number;
    swords: number;
    createdAt: Date;
}

export type SAOCSort = 'time' | 'username' | 'level' | 'achievements' | 'swords'; 
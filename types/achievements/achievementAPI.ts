export interface AchievementAPI {
    _id: string;
    name: string;
    description: string;
    level: number;
    title: string;
    points: number;
    icon: string;
    createdAt: Date;
}

export interface AchievementsGroup {
    name: string;
    items: AchievementAPI[];
}
export interface CityDefenceAPI {
    _id: string;
    accuracy: number;
    points: number;
    username: string;
    createdAt: Date;
}

export type CityDefenceSort = 'accuracy' | 'points' | 'username' | 'date' | 'overall';
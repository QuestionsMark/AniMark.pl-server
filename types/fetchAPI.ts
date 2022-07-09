import { Kind } from "./anime";

export type Sort = 'new' | 'alphabetic' | 'old' | 'best' | 'worst';

export type Method = 'POST' | 'DELETE' | 'PATCH' | 'PUT' | 'GET';

export interface Queries {
    kind?: Kind;
    minRate?: string;
    maxRate?: string;
    sort?: Sort;
    rankingSort?: 'time' | 'username' | 'achievements' | 'swords' | 'level' | 'points' | 'date' | 'overall' | 'accuracy';
    wantedTypes?: string[];
    unwantedTypes?: string[];
}
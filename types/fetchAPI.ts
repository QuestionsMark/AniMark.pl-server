import { Kind } from "./anime";

export type Sort = 'new' | 'alphabetic' | 'old' | 'best' | 'worst';

export interface Queries {
    kind?: Kind;
    minRate?: string;
    maxRate?: string;
    sort?: Sort;
    wantedTypes?: string[];
    unwantedTypes?: string[];
}
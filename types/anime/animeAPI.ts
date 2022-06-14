import { Comment, Rate, Soundtrack } from "../common";
import { TypeAPI } from "../types";
import { UserAPI } from "../users";

export type Kind = "movie" | "series" | "all";

export interface AnimeInfo {
    scenario: string;
    productionYear: number;
    duration: string;
}

export interface AnimeImage {
    src: string;
    fromAnime: string;
}

export interface AnimeImagesObject {
    background: AnimeImage;
    baner: AnimeImage;
    mini: AnimeImage;
    galeryImages: AnimeImage[];
}

export interface AnimeDescriptionAuthor {
    _id: string;
    username: string;
}

export interface AnimeDescription {
    author: string;
    description: string;
    createdAt: Date;
}
export interface AnimeDescriptionPopulate {
    author: AnimeDescriptionAuthor;
    description: string;
    createdAt: Date;
}

export interface AnimeSeason {
    _id: string;
    title: string;
    image: AnimeImage;
}

export interface AnimeAPI {
    _id: string;
    kind: Kind;
    title: string;
    watchLink: string;
    info: AnimeInfo;
    types: string[];
    rate: Rate[];
    averageRate: number;
    likes: string[];
    images: AnimeImagesObject;
    soundtracks: Soundtrack[];
    description: AnimeDescription;
    seasons: string[];
    comments: Comment[];
    createdAt: Date;
}

// Dla pobierania pojedynczego anime
export interface AnimePopulateAPI {
    _id: string;
    kind: Kind;
    title: string;
    watchLink: string;
    info: AnimeInfo;
    types: TypeAPI[];
    rates: Rate[];
    averageRate: number;
    likes: UserAPI[];
    images: AnimeImagesObject;
    soundtracks: Soundtrack[];
    description: AnimeDescriptionPopulate;
    seasons: AnimeAPI[];
    comments: Comment[];
    createdAt: Date;
}

export interface AnimeForm {
    _id: string;
    title: string;
}

export interface AnimeFilters {
    maxRate: number | null;
    minRate: number | null;
    unwantedTypes: string[];
    wantedTypes: string[];
    kind: Kind | 'all';
}

export interface AnimeCondensedAPI {
    _id: string;
    kind: Kind;
    title: string;
    types: TypeAPI[];
    averageRate: number;
    image: AnimeImage;
}
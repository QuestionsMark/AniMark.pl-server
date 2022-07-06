import { AnimeCreatePreview, Kind } from "./anime";
import { AudioPreview, ImagePreview } from "./common";
import { Sort } from "./fetchAPI";

export type ValidationType = "LOGIN" | "REGISTRATION" | "NEWS_CREATE" | "NEWS_EDIT" | "ANIME_CREATE" | "ANIME_EDIT" | "PROJECT_CREATE";

export interface OtherLink {
    src: string;
    note: string;
}

export interface LoginFormEntity {
    login: string;
    password: string;
}

export interface RegistrationFormEntity {
    login: string;
    password: string;
    email: string;
    username: string;
    rulesAcceptation: boolean;
}

export interface FiltersEntity {
    kind: Kind;
    maxRate: string;
    minRate: string;
    sort: Sort;
    unwantedTypes: string[];
    wantedTypes: string[];
}

export interface NewsFormEntity {
    title: string;
    description: string;
    videos: string[];
    otherLinks: OtherLink[];
    choosedImages: string[];
    images: File[] | null;
    preview: ImagePreview[];
}

export interface NewsEditEntity {
    title: string;
    description: string;
    videos: string[];
    otherLinks: OtherLink[];
    choosedImages: string[];
    images: File[] | null;
    savedImages: string[];
    preview: ImagePreview[];
}

export interface AnimeCreateEntity {
    kind: Kind;
    title: string;
    scenario: string;
    productionYear: number | null;
    epizodesCount: number | null;
    epizodeDuration: number | null;
    hours: number | null;
    minutes: number | null;
    watchLink: string;
    types: string[];
    seasons: string[];
    mini: File | null;
    background: File | null;
    baner: File | null;
    animeImagesPreview: AnimeCreatePreview;
    soundtracks: File[] | null;
    soundtracksPreview: AudioPreview[];
}

export interface ProjectCreateEntity {
    name: string;
    description: string;
    technologies: string[];
    images: File[] | null;
    preview: ImagePreview[];
    links: OtherLink[];
    otherLinks: OtherLink[];
}

export type FormEntity = LoginFormEntity | RegistrationFormEntity | NewsFormEntity | AnimeCreateEntity | ProjectCreateEntity;
import { AnimeCreatePreview, AnimeDescription, AnimeImagesObject, Kind } from "./anime";
import { AudioPreview, ImagePreview, Soundtrack } from "./common";
import { Sort } from "./fetchAPI";

export type ValidationType = "LOGIN" | "REGISTRATION" | "NEWS_CREATE" | "NEWS_EDIT" | "ANIME_CREATE" | "ANIME_EDIT" | "PROJECT_CREATE" | "IMAGE_EDIT" | "SOUNDTRACKS_ADD";

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

export interface AnimeEditEntity {
    kind: Kind;
    animeDescription: AnimeDescription;
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
    savedImages: AnimeImagesObject;
    savedSoundtracks: Soundtrack[];
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

export type FormEntity = LoginFormEntity | RegistrationFormEntity | NewsFormEntity | AnimeCreateEntity | ProjectCreateEntity | ImagePreview | AudioPreview[];
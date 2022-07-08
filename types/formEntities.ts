import { AnimeCreatePreview, AnimeDescription, AnimeImagesObject, Kind } from "./anime";
import { AudioPreview, ImagePreview, Soundtrack } from "./common";
import { Sort } from "./fetchAPI";
import { Introduction } from "./users";

export type ValidationType = "LOGIN" | "REGISTRATION" | "NEWS_CREATE" | "NEWS_EDIT" | "ANIME_CREATE" | "ANIME_EDIT" | "PROJECT_CREATE" | "IMAGE_EDIT" | "PROFILE_IMAGES_ADD" | "SOUNDTRACKS_ADD" | "PROFILE_EDIT" | "PROFILE_PRIVACY_EDIT";

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

export interface ProfileEditEntity {
    avatar: File | null;
    avatarPreview: ImagePreview;
    profileBackground: string;
    favoriteType: string;
    username: string;
    introduction: Introduction;
    images: File[] | null;
    preview: ImagePreview[];
}

export interface PrivacyEditEntity {
    email: string;
    login: string;
    password: string;
    passwordAgain: string;
    passwordConfirm: string;
}

export type FormEntity = LoginFormEntity | RegistrationFormEntity | NewsFormEntity | AnimeCreateEntity | ProjectCreateEntity | ImagePreview | ImagePreview[] | AudioPreview[] | ProfileEditEntity | string[] | PrivacyEditEntity;
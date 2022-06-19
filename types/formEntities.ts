import { Kind } from "./anime";
import { ImagePreview } from "./common";
import { Sort } from "./fetchAPI";

export type ValidationType = "LOGIN" | "REGISTRATION" | "NEWS_CREATE" | "NEWS__EDIT" | "ANIME_CREATE" | "ANIME_EDIT";

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

export type FormEntity = LoginFormEntity | RegistrationFormEntity | NewsFormEntity;
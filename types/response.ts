import { AchievementAPI } from "./achievements";
import { AnimeAPI } from "./anime";
import { AnimeOnTopAPI } from "./animeOnTop";
import { AuthorizationAPI, Token } from "./authorizationAPI";
import { OnlineUser } from "./common";
import { NewsAPI } from "./news";
import { SwordArtOnlineResultAPI } from "./swordArtOnlineResults";
import { TypeAPI } from "./types";
import { UserAPI } from "./users";
import { WhatsTheMelodyAPI } from "./whatsTheMelody";

export type AnyData = AchievementAPI[] | AnimeAPI[] | AnimeOnTopAPI[] | NewsAPI[] | SwordArtOnlineResultAPI[] | TypeAPI[] | UserAPI[] | WhatsTheMelodyAPI[] | OnlineUser[] | AchievementAPI | AnimeAPI | AnimeOnTopAPI | NewsAPI | NewsAPI | SwordArtOnlineResultAPI | TypeAPI | UserAPI | WhatsTheMelodyAPI | OnlineUser | AuthorizationAPI | Token;

export type Data = AchievementAPI[] | AnimeAPI[] | AnimeOnTopAPI[] | NewsAPI[] | SwordArtOnlineResultAPI[] | TypeAPI[] | UserAPI[] | WhatsTheMelodyAPI[];

export interface ServerResponse {
    message: string;
    results?: AnyData;
}
export interface ServerApiResponse {
    results: any;
    amount?: number;
}
export interface ServerErrorResponse {
    message: string;
    validation?: string[];
}

export interface ClientResponse {
    status: boolean;
    message: string;
    validation?: string[];
    results?: AnyData;
}

export interface ClientErrorResponse {
    status: false;
    message: string;
    validation?: string[];
}


export interface ClientApiResponseOk {
    status: true;
    results: AnyData;
    amount?: number;
}
export interface ClientApiResponseError {
    status: false;
    message: string;
}
export type ClientApiResponse = ClientApiResponseOk | ClientApiResponseError;

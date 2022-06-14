import { AchievementAPI } from "./achievements";
import { AnimeAPI, AnimeForm, RecommendedAnimeAPI } from "./anime";
import { AnimeOnTopAPI, AnimeOnTopPopulateAPI, AnimeOnTopWinnerAPI } from "./animeOnTop";
import { AuthorizationAPI, Token } from "./authorizationAPI";
import { Comment, CommentPopulate, OnlineUser } from "./common";
import { NewsAPI, NewsCondensedAPI } from "./news";
import { SwordArtOnlineResultAPI } from "./swordArtOnlineResults";
import { TypeAPI } from "./types";
import { UserAPI } from "./users";
import { WhatsTheMelodyAPI, WhatsTheMelodyQuestion, WhatsTheMelodyResults } from "./whatsTheMelody";

export type AnyData = AchievementAPI[] | AnimeAPI[] | AnimeOnTopAPI[] | NewsAPI[] | SwordArtOnlineResultAPI[] | TypeAPI[] | UserAPI[] | WhatsTheMelodyAPI[] | OnlineUser[] | RecommendedAnimeAPI | AchievementAPI | AnimeAPI | AnimeOnTopAPI | NewsAPI | NewsAPI | SwordArtOnlineResultAPI | TypeAPI | UserAPI | WhatsTheMelodyAPI | OnlineUser | AuthorizationAPI | Token | Comment | Comment[] | WhatsTheMelodyQuestion | WhatsTheMelodyResults | CommentPopulate | CommentPopulate[] | AnimeOnTopWinnerAPI | AnimeOnTopPopulateAPI | NewsCondensedAPI | NewsCondensedAPI[] | AnimeForm | AnimeForm[] | any;

export type AnyArrayData = AchievementAPI[] | AnimeAPI[] | AnimeOnTopAPI[] | NewsAPI[] | SwordArtOnlineResultAPI[] | TypeAPI[] | UserAPI[] | WhatsTheMelodyAPI[] | OnlineUser[] | Comment[] | CommentPopulate[];

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

export interface SocketErrorResponse {
    status: false;
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

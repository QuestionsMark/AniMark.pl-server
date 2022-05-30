import { UserAPI } from "../users";

export interface Rate {
    user: UserAPI;
    rate: number;
}
import { UserAPI } from "../users";

export interface Soundtrack {
    src: string;
    title: string;
    composer: string;
    likes: UserAPI[];
}
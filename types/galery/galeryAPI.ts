import { AnimeImage } from "../anime";

export interface galeryAPI {
    _id: string;
    images: AnimeImage[];
    title: string;
}
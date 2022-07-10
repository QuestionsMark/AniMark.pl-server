import { TypeAPI } from "../types";
import { AnimeImage, Kind } from "./animeAPI";

export interface RecommendedAnimeAPI {
    _id: string;
    kind: Kind;
    title: string;
    types: TypeAPI[];
    averageRate: number;
    likes: string[];
    image: AnimeImage;
    soundtrackSrc: string;
    description: string;
}
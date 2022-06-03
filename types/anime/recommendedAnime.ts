import { TypeAPI } from "../types";
import { Kind } from "./animeAPI";

export interface RecommendedAnime {
    _id: string;
    kind: Kind;
    title: string;
    types: TypeAPI[];
    averageRate: number;
    likes: string[];
    imageSrc: string;
    soundtrackSrc: string;
    description: string;
}
import { OtherLink } from "../formEntities";

export interface ProjectAPI {
    _id: string;
    name: string;
    description: string;
    technologies: string[];
    links: OtherLink[];
    otherLinks: OtherLink[];
    imgSrc: string;
    createdAt: Date;
}
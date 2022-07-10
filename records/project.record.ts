import { ValidationError } from "../middlewares/error";
import { Project } from "../models/projects";
import { ProjectAPI } from "../types";
import { OtherLink, ProjectCreateEntity } from "../types/formEntities";

export class ProjectRecord implements ProjectAPI {
    _id: string;
    name: string;
    description: string;
    technologies: string[];
    links: OtherLink[];
    otherLinks: OtherLink[];
    imgSrc: string;
    createdAt: Date;

    static async getOne(id: string): Promise<ProjectAPI> {
        const project = await Project.findById(id);
        if (!project) throw new ValidationError('Nie znaleziono projektu.');
        return project;
    }

    static async getLast(): Promise<ProjectAPI[]> {
        return Project.find().sort({ createdAt: -1 }).limit(3);
    }

    static async create(data: ProjectCreateEntity, uploaded: string[]): Promise<void> {
        const { description, links, name, otherLinks, technologies } = data;
        await Project.create({ description, name, imgSrc: uploaded[0], links, otherLinks, technologies });
    }
}
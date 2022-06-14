import { Type } from "../models/types";
import { TypeAPI } from "../types";

export class TypeRecord implements TypeAPI {
    _id: string;
    name: string;
    description: string;
    constructor(

    ) {

    }

    static async getAll(): Promise<TypeAPI[]> {
        return Type.find();
    };
}
import { Type } from "../models/types";
import { TypeAPI, TypeFormListAPI } from "../types";

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

    static async getFormList(): Promise<TypeFormListAPI[]> {
        return Type.find().select('name').sort({ 'name': 1 });
    };
}
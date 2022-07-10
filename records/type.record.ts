import { Types } from "mongoose";
import { ValidationError } from "../middlewares/error";
import { Anime } from "../models/anime";
import { Type } from "../models/types";
import { User } from "../models/users";
import { AnimePopulateAPI, TypeAPI, TypeFormListAPI, TypePageAPI, UserAPI } from "../types";

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
    static async getOne(id: string): Promise<TypePageAPI> {
        const type = await Type.findById(id) as TypeAPI;
        if (!type) throw new ValidationError('Nie znaleziono gatunku.');
        const anime = await Anime.find({ "types": { $in: [new Types.ObjectId(id)] } }).limit(3).sort({ averageRate: -1 }).select('images.mini').select('title').select('averageRate') as AnimePopulateAPI[];
        const lovers = await User.find({ favoriteType: new Types.ObjectId(id) }).limit(3).sort({ sumOfPoints: -1 }).select('username').select('avatar') as UserAPI[];
        const animeCount = await Anime.countDocuments().where({ "types": { $in: [new Types.ObjectId(id)] } });
        const { description, name } = type;
        return ({
            _id: id,
            animeCount,
            bestAnime: anime.map(a => ({ anime: { _id: a._id, image: a.images.mini, title: a.title }, rate: a.averageRate })),
            description,
            lovers,
            name,
        });
    };

    static async getFormList(): Promise<TypeFormListAPI[]> {
        return Type.find().select('name').sort({ 'name': 1 });
    };
}
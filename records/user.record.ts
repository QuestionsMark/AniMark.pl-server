import { genSalt, hash as genHash } from "bcrypt";
import { ValidationError } from "../middlewares/error";
import { User, UserModel } from "../models/users";
import { AchievementAPI, FavoriteAnime, Introduction, Points, TypeAPI, UserAnimeData, UserAPI } from "../types";
import { registartionValidation, RegistrationFormEntity } from "../validation/registraction";

const defaultPoints: Points = {
    accountTime: 0,
    animeOnTop: 0,
    comments: 0,
    descriptions: 0,
    profileLikes: 0,
    soundtrackLikes: 0,
    watchedAnime: 0,
    whatsTheMelody: 0,
};

const defaultIntroduction: Introduction = {
    description: 'Twój opis...',
    title: 'Twój Tytuł',
};

export class UserRecord implements UserAPI {
    _id: string;
    email: string;
    login: string;
    password: string;
    rank: number;
    username: string;
    avatar: string;
    background: string;
    customBackgrounds: { src: string; }[];
    likes: UserAPI[];
    achievements: AchievementAPI[];
    points: Points;
    userAnimeData: UserAnimeData;
    introduction: Introduction;
    favoriteAnime: FavoriteAnime[];
    favoriteType: TypeAPI;
    createdAt: Date;
    constructor(obj: UserAPI) {
        this._id = obj._id.toString();
        this.achievements = obj.achievements;
        this.avatar = obj.avatar;
        this.background = obj.background;
        this.createdAt = obj.createdAt;
        this.customBackgrounds = obj.customBackgrounds;
        this.email = obj.email;
        this.favoriteAnime = obj.favoriteAnime;
        this.favoriteType = obj.favoriteType;
        this.introduction = obj.introduction;
        this.likes = obj.likes;
        this.login = obj.login;
        this.password = obj.password;
        this.points = obj.points;
        this.rank = obj.rank;
        this.userAnimeData = obj.userAnimeData;
        this.username = obj.username;
    }

    static async findAll() {

    }

    static async create(user: RegistrationFormEntity): Promise<UserRecord> {
        const errors = registartionValidation(user);
        if (errors.length !== 0) throw new ValidationError('Nieprawidłowe dane!', errors);

        const { email, login, password, username } = user;
        const salt = await genSalt(10);
        const hash = await genHash(password, salt);

        const newUser = await User.create({
            email,
            login,
            password: hash,
            username,
            points: defaultPoints,
            introduction: defaultIntroduction,
        }) as UserAPI;

        return new UserRecord(newUser);
    }

    static async findByLogin(login: string): Promise<UserModel> {
        return User.findOne({ login });
    }
}
import { genSalt, hash as genHash } from "bcrypt";
import { Types } from "mongoose";
import { ValidationError } from "../middlewares/error";
import { Anime } from "../models/anime";
import { User, UserModel } from "../models/users";
import { AnimeAPI, FavoriteAnime, Introduction, Points, ProfileAPI, RecommendedProfileAPI, UserAnimeData, UserAPI, UserDataAPI, UserPopulateAPI } from "../types";
import { getTimeSpentWithAnime } from "../utils/getTimeSpentWithAnime";
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
    likes: string[];
    achievements: string[];
    points: Points;
    sumOfPoints: number;
    userAnimeData: UserAnimeData;
    introduction: Introduction;
    favoriteAnime: FavoriteAnime[];
    favoriteType: string;
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

    static async getRecommended(): Promise<RecommendedProfileAPI[]> {
        const users = await User.aggregate([
            {
                $project: { length: { $size: "$likes" } }
            },
            {
                $sort: { "length": -1 }
            },
            {
                $limit: 6
            }
        ]);
        const sorted: RecommendedProfileAPI[] = [];
        for (const { _id } of users) {
            const user = await User.findById(_id);
            const { avatar, background, likes, points, username } = user;
            sorted.push({ _id, avatar, background, likes, points, username });
        }
        return sorted;
    }

    static async getAnimeData(userId: string): Promise<UserAnimeData | null> {
        const user = await User.findById(userId).select('userAnimeData');
        if (!user) return null;
        return user.userAnimeData;
    }

    static async getFavoriteAnime(userId: string): Promise<FavoriteAnime[] | null> {
        const user = await User.findById(userId).select('favoriteAnime');
        if (!user) return null;
        return user.favoriteAnime;
    }

    static async getUserData(userId: string): Promise<UserDataAPI | null> {
        const user = await User.findById(userId).select('favoriteAnime').select('favoriteType').select('userAnimeData').select('avatar');
        if (!user) return null;
        const { avatar, userAnimeData, favoriteAnime, favoriteType } = user;
        return { avatar, userAnimeData, favoriteAnime, favoriteType };
    }


    // Obsługa UserAnimeData:

    static async handleFavoriteAnime(userId: string, animeId: string): Promise<string> {
        const anime: AnimeAPI = await Anime.findById(animeId).select('rate');
        const { rate } = anime;
        const user = await User.findById(userId).select('favoriteAnime');
        const { favoriteAnime } = user;
        const isFavoriteAnime = favoriteAnime.findIndex(a => a.anime.toString() === animeId) !== -1;

        if (isFavoriteAnime) {
            await User.findByIdAndUpdate(userId, { $pull: { favoriteAnime: { anime: new Types.ObjectId(animeId) } } });
            await Anime.findByIdAndUpdate(animeId, { $pull: { likes: new Types.ObjectId(userId) } });
            return 'Anime zostało usuniętę z listy Twoich ulubionych.';
        } else {
            const userRate = rate.find(r => r.user.toString() === userId)?.rate;
            await User.findByIdAndUpdate(userId, { $push: { favoriteAnime: { anime: new Types.ObjectId(animeId), rate: userRate ? userRate : 0 } } });
            await Anime.findByIdAndUpdate(animeId, { $push: { likes: new Types.ObjectId(userId) } });
            return 'Anime zostało dodane do listy Twoich ulubionych.';
        }
    }

    static async handleWatched(userId: string, animeId: string): Promise<void> {
        const anime: AnimeAPI = await Anime.findById(animeId).select('rate');
        const { rate } = anime;
        const user = await User.findById(userId).select('userAnimeData');
        const { userAnimeData } = user;
        const isWatched = userAnimeData.watched.findIndex(a => a.anime.toString() === animeId) !== -1;
        const isPlanned = userAnimeData.planned.findIndex(a => a.toString() === animeId) !== -1;
        const isProcessOfWatching = userAnimeData.processOfWatching.findIndex(a => a.toString() === animeId) !== -1;
        const isStopped = userAnimeData.stopped.findIndex(a => a.toString() === animeId) !== -1;

        if (isWatched) {
            await User.findByIdAndUpdate(userId, { $pull: { 'userAnimeData.watched': { anime: new Types.ObjectId(animeId) } } });
        } else {
            if (isPlanned) {
                await User.findByIdAndUpdate(userId, { $pull: { 'userAnimeData.planned': new Types.ObjectId(animeId) } });
            }
            if (isProcessOfWatching) {
                await User.findByIdAndUpdate(userId, { $pull: { 'userAnimeData.processOfWatching': new Types.ObjectId(animeId) } });
            }
            if (isStopped) {
                await User.findByIdAndUpdate(userId, { $pull: { 'userAnimeData.stopped': new Types.ObjectId(animeId) } });
            }
            const userRate = rate.find(r => r.user.toString() === userId)?.rate;
            await User.findByIdAndUpdate(userId, { $push: { 'userAnimeData.watched': { anime: new Types.ObjectId(animeId), rate: userRate ? userRate : 0 } } });
        }
        // setWatchedAnimePoints(userID);
    }

    static async handleStopped(userId: string, animeId: string): Promise<void> {
        const user = await User.findById(userId).select('userAnimeData');
        const { userAnimeData } = user;
        const isWatched = userAnimeData.watched.findIndex(a => a.anime.toString() === animeId) !== -1;
        const isPlanned = userAnimeData.planned.findIndex(a => a.toString() === animeId) !== -1;
        const isProcessOfWatching = userAnimeData.processOfWatching.findIndex(a => a.toString() === animeId) !== -1;
        const isStopped = userAnimeData.stopped.findIndex(a => a.toString() === animeId) !== -1;

        if (isStopped) {
            await User.findByIdAndUpdate(userId, { $pull: { 'userAnimeData.stopped': new Types.ObjectId(animeId) } });
        } else {
            if (isPlanned) {
                await User.findByIdAndUpdate(userId, { $pull: { 'userAnimeData.planned': new Types.ObjectId(animeId) } });
            }
            if (isProcessOfWatching) {
                await User.findByIdAndUpdate(userId, { $pull: { 'userAnimeData.processOfWatching': new Types.ObjectId(animeId) } });
            }
            if (isWatched) {
                await User.findByIdAndUpdate(userId, { $pull: { 'userAnimeData.watched': { anime: new Types.ObjectId(animeId) } } });
            }
            await User.findByIdAndUpdate(userId, { $push: { 'userAnimeData.stopped': new Types.ObjectId(animeId) } });
        }
        // setWatchedAnimePoints(userID);
    }

    static async handleProcessOfWatching(userId: string, animeId: string): Promise<void> {
        const user = await User.findById(userId).select('userAnimeData');
        const { userAnimeData } = user;
        const isWatched = userAnimeData.watched.findIndex(a => a.anime.toString() === animeId) !== -1;
        const isPlanned = userAnimeData.planned.findIndex(a => a.toString() === animeId) !== -1;
        const isProcessOfWatching = userAnimeData.processOfWatching.findIndex(a => a.toString() === animeId) !== -1;
        const isStopped = userAnimeData.stopped.findIndex(a => a.toString() === animeId) !== -1;

        if (isProcessOfWatching) {
            await User.findByIdAndUpdate(userId, { $pull: { 'userAnimeData.processOfWatching': new Types.ObjectId(animeId) } });
        } else {
            if (isPlanned) {
                await User.findByIdAndUpdate(userId, { $pull: { 'userAnimeData.planned': new Types.ObjectId(animeId) } });
            }
            if (isStopped) {
                await User.findByIdAndUpdate(userId, { $pull: { 'userAnimeData.stopped': new Types.ObjectId(animeId) } });
            }
            if (isWatched) {
                await User.findByIdAndUpdate(userId, { $pull: { 'userAnimeData.watched': { anime: new Types.ObjectId(animeId) } } });
            }
            await User.findByIdAndUpdate(userId, { $push: { 'userAnimeData.processOfWatching': new Types.ObjectId(animeId) } });
        }
        // setWatchedAnimePoints(userID);
    }
    static async handlePlanned(userId: string, animeId: string): Promise<void> {
        const user = await User.findById(userId).select('userAnimeData');
        const { userAnimeData } = user;
        const isWatched = userAnimeData.watched.findIndex(a => a.anime.toString() === animeId) !== -1;
        const isPlanned = userAnimeData.planned.findIndex(a => a.toString() === animeId) !== -1;
        const isProcessOfWatching = userAnimeData.processOfWatching.findIndex(a => a.toString() === animeId) !== -1;
        const isStopped = userAnimeData.stopped.findIndex(a => a.toString() === animeId) !== -1;

        if (isPlanned) {
            await User.findByIdAndUpdate(userId, { $pull: { 'userAnimeData.planned': new Types.ObjectId(animeId) } });
        } else {
            if (isProcessOfWatching) {
                await User.findByIdAndUpdate(userId, { $pull: { 'userAnimeData.processOfWatching': new Types.ObjectId(animeId) } });
            }
            if (isStopped) {
                await User.findByIdAndUpdate(userId, { $pull: { 'userAnimeData.stopped': new Types.ObjectId(animeId) } });
            }
            if (isWatched) {
                await User.findByIdAndUpdate(userId, { $pull: { 'userAnimeData.watched': { anime: new Types.ObjectId(animeId) } } });
            }
            await User.findByIdAndUpdate(userId, { $push: { 'userAnimeData.planned': new Types.ObjectId(animeId) } });
        }
        // setWatchedAnimePoints(userID);
    }

    static async getProfile(userId: string): Promise<ProfileAPI | null> {
        const user: UserPopulateAPI = await User
            .findById(userId)
            .populate('favoriteType')
            .populate('favoriteAnime.anime', ['title', 'images'])
            .populate('achievements')
            .populate('userAnimeData.processOfWatching', ['title', 'images'])
            .populate('userAnimeData.stopped', ['title', 'images'])
            .populate('userAnimeData.planned', ['title', 'images'])
            .populate('userAnimeData.watched.anime', ['title', 'images']);
        if (!user) return null;
        const { _id, achievements, avatar, background, createdAt, favoriteAnime, favoriteType, introduction, likes, points, rank, sumOfPoints, userAnimeData, username } = user;
        const { planned, processOfWatching, stopped, watched } = userAnimeData;
        return {
            _id,
            achievements,
            avatar,
            background,
            createdAt,
            favoriteAnime: favoriteAnime.map(a => ({
                anime: {
                    _id: a.anime._id,
                    image: a.anime.images.mini,
                    title: a.anime.title,
                },
                rate: a.rate,
            })),
            favoriteType,
            introduction,
            likes,
            points,
            rank,
            sumOfPoints,
            userAnimeData: {
                planned: planned.map(a => ({ _id: a._id, image: a.images.mini, title: a.title })),
                processOfWatching: processOfWatching.map(a => ({ _id: a._id, image: a.images.mini, title: a.title })),
                stopped: stopped.map(a => ({ _id: a._id, image: a.images.mini, title: a.title })),
                watched: watched.map(a => ({ anime: { _id: a.anime._id, image: a.anime.images.mini, title: a.anime.title }, rate: a.rate })),
            },
            username,
            timeSpentWithAnime: await getTimeSpentWithAnime(userId),
        };
    }

    static async likeProfile(userId: string, like: string): Promise<boolean> {
        const user = await User.findById(userId);
        if (!user) return false;
        const isLike = user.likes.findIndex(l => l.toString() === like) !== -1;
        if (isLike) {
            await User.findByIdAndUpdate(userId, { $pull: { likes: new Types.ObjectId(like) } });
        } else {
            await User.findByIdAndUpdate(userId, { $push: { likes: new Types.ObjectId(like) } });
        }
        return true;
    }

    static async getBackground(userId: string): Promise<string> {
        const user = await User.findById(userId).select('background');
        if (!user) return '';
        return user.background;
    }
}
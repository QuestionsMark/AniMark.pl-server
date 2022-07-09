import { NextFunction } from "express";
import { Types } from "mongoose";
import { ValidationError } from "../middlewares/error";
import { Anime } from "../models/anime";
import { News } from "../models/news";
import { User } from "../models/users";
import { WhatsTheMelody } from "../models/whatsTheMelody";
import { AnimeAPI, AnimeDescription, AnimeInfo, Comment, AnimeImagesObject, Rate, RecommendedAnimeAPI, Soundtrack, AnimePopulateAPI, AnimeForm, Kind, TypeAPI, AnimePageAPI, UserAPI, AnimeImage, galeryAPI, NewsAPI, WhatsTheMelodyAPI, AudioPreview } from "../types";
import { AnimeCreateEntity, AnimeEditEntity } from "../types/formEntities";
import { deleteFiles } from "../utils/deleteImages";
import { getDuration } from "../utils/getDuration";
import { animeEditInformationsValidation } from "../validation/animeEditInformationsValidation";

const changeFavoriteRate = async (animeId: string, userId: string, rate: number) => {
    await User.findByIdAndUpdate(userId, { 'favoriteAnime.$[anime].rate': rate }, { arrayFilters: [{ 'anime.anime': new Types.ObjectId(animeId) }] });
};

const resetFavoriteRate = async (animeId: string, userId: string) => {
    await User.findByIdAndUpdate(userId, { 'favoriteAnime.$[anime].rate': 0 }, { arrayFilters: [{ 'anime.anime': new Types.ObjectId(animeId) }] });
};

const changeWatchedRate = async (animeId: string, userId: string, rate: number) => {
    await User.findByIdAndUpdate(userId, { 'userAnimeData.watched.$[element].rate': rate }, { arrayFilters: [{ 'element.anime': new Types.ObjectId(animeId) }] });
};

const pullRate = async (animeId: string, userId: string) => {
    await Anime.findByIdAndUpdate(animeId, { $pull: { rate: { user: new Types.ObjectId(userId) } } });
};

const pushRate = async (animeId: string, userId: string, rate: number) => {
    await Anime.findByIdAndUpdate(animeId, { $push: { rate: { user: new Types.ObjectId(userId), rate } } });
};

export class AnimeRecord implements AnimeAPI {
    _id: string;
    kind: Kind;
    title: string;
    watchLink: string;
    info: AnimeInfo;
    types: string[];
    rate: Rate[];
    averageRate: number;
    likes: string[];
    images: AnimeImagesObject;
    soundtracks: Soundtrack[];
    description: AnimeDescription;
    seasons: string[];
    comments: Comment[];
    createdAt: Date;
    constructor(

    ) {

    }

    static async getRecommended(): Promise<RecommendedAnimeAPI | null> {
        const animeLength = await Anime.countDocuments();
        const index = Math.floor(Math.random() * animeLength);
        const recommendedArr: AnimePopulateAPI[] = await Anime.find().skip(index).limit(1).populate('types', ['_id', 'name']);
        if (!(recommendedArr.length > 0)) return null;
        const { _id, averageRate, description, images, kind, likes, soundtracks, title, types } = recommendedArr[0];
        return { _id, averageRate, description: description.description, image: images.mini, kind, likes: likes as any, soundtrackSrc: soundtracks[0] ? soundtracks[0].src : '', title, types };
    };

    static async getAnimeFormList(): Promise<AnimeForm[]> {
        return Anime.find().select('title').sort({ 'title': 1 });
    }

    static async getTypes(animeId: string): Promise<TypeAPI[] | null> {
        const anime = await Anime.findById(animeId).select('types').populate('types');
        if (!anime) return null;
        return anime.types;
    }

    static async getBackground(animeId: string): Promise<string> {
        const anime = await Anime.findById(animeId).select('images.background');
        if (!anime) return '';
        return anime.images.background.src;
    }

    static async create(data: AnimeCreateEntity, uploadedFiles: string[], next: NextFunction): Promise<string> {
        const { epizodeDuration, epizodesCount, hours, kind, minutes, productionYear, scenario, seasons, soundtracksPreview, title, watchLink, types } = data;
        try {
            const newAnime = await Anime.create({
                kind,
                title: title.trim().charAt(0).toUpperCase() + title.trim().slice(1),
                watchLink: watchLink.trim(),
                info: {
                    scenario,
                    productionYear,
                    duration: getDuration(kind, hours, minutes, epizodeDuration, epizodesCount),
                },
                types,
                images: {
                    background: {
                        src: uploadedFiles[0],
                        fromAnime: title,
                    },
                    baner: {
                        src: uploadedFiles[1],
                        fromAnime: title,
                    },
                    mini: {
                        src: uploadedFiles[2],
                        fromAnime: title,
                    },
                    galeryImages: [
                        { src: uploadedFiles[0], fromAnime: title },
                        { src: uploadedFiles[1], fromAnime: title },
                        { src: uploadedFiles[2], fromAnime: title },
                    ],
                },
                soundtracks: uploadedFiles.slice(3).map((a, i) => ({
                    src: a,
                    title: soundtracksPreview[i].title,
                    composer: soundtracksPreview[i].composer,
                })),
                description: {
                    author: '62ac254dcd191734242d3e5f',
                    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae harum tenetur deserunt illum temporibus accusantium debitis perspiciatis suscipit ab nisi cupiditate nihil quibusdam non neque veniam, minus at ratione itaque maiores? Neque molestiae, laudantium cupiditate assumenda repellendus exercitationem odio, officia similique dolorem tenetur voluptas, omnis non. Aperiam, consequuntur. Dicta magni voluptate deleniti commodi corrupti modi exercitationem repellendus dolorum repellat est ducimus aspernatur ipsum sint quis praesentium obcaecati accusamus quisquam similique odit quam dolore corporis, sit sed provident.
                    Id nostrum inventore mollitia quam quas qui at, aliquid quo esse labore ipsa maxime doloribus tempora aspernatur culpa officia ducimus ex facere, eveniet soluta. Officiis consequuntur tenetur ut dicta officia quas, necessitatibus, odio quis deleniti nemo. Eum, quia quaerat ducimus corrupti possimus deserunt exercitationem natus error, neque quibusdam dolor sit cum ipsa enim sapiente mollitia illo! Corrupti sunt facere facilis expedita voluptatibus obcaecati rem sit beatae maxime consequuntur nam deleniti perferendis sequi magni asperiores ipsam, dolorem delectus quam recusandae suscipit aliquam error? Consectetur est ullam tempore fugiat facilis rerum quia aliquam deserunt pariatur id harum inventore cupiditate ut delectus ipsa veniam reprehenderit sapiente, perferendis officia ducimus eos laboriosam voluptatem asperiores deleniti. Eveniet, quos consequatur. Id nostrum inventore mollitia quam quas qui at, aliquid quo esse labore ipsa maxime doloribus tempora aspernatur culpa officia ducimus ex facere, eveniet soluta. Officiis consequuntur tenetur ut dicta officia quas, necessitatibus, odio maxime aut hic ad adipisci architecto, quos possimus similique quis deleniti nemo. Maxime consequuntur nam deleniti perferendis sequi magni asperiores ipsam, dolorem delectus quam recusandae suscipit aliquam error? Consectetur est ullam tempore fugiat facilis rerum quia aliquam deserunt pariatur id harum inventore cupiditate ut delectus ipsa veniam reprehenderit sapiente, perferendis officia ducimus eos laboriosam voluptatem asperiores deleniti.
                    Eveniet, quos consequatur. Id nostrum inventore mollitia quam quas qui at, aliquid quo esse labore ipsa maxime doloribus tempora aspernatur culpa officia ducimus ex facere, eveniet soluta. Officiis consequuntur tenetur ut dicta officia quas, necessitatibus, odio maxime aut hic ad adipisci architecto, quos possimus similique quis deleniti nemo.`,
                    createdAt: Date.now(),
                },
                seasons,
            });
            return `Dodano nowe anime o tytule "${newAnime.title}"`;
        } catch (error) {
            await deleteFiles(uploadedFiles);
            next(error);
            return '';
        }
    }

    static async getOne(id: string): Promise<AnimePageAPI | null> {
        const anime = await Anime
            .findById(id)
            .populate('comments.user', ['username', 'avatar'])
            .populate('description.author', ['username'])
            .populate('seasons', ['images.mini', 'title'])
            .populate('types', ['name']) as AnimePopulateAPI;
        if (!anime) return null;
        const { _id, averageRate, comments, createdAt, description, images, info, kind, likes, rate, seasons, soundtracks, title, types, watchLink } = anime;
        return {
            _id,
            averageRate,
            comments,
            createdAt,
            description,
            images,
            info,
            kind,
            likes,
            rate,
            seasons: seasons.map(s => ({ _id: s._id, image: s.images.mini, title: s.title })),
            soundtracks,
            title,
            types,
            watchLink,
        }
    }

    static async newRate(id: string, rate: number, userId: string): Promise<string> {
        const user = await User.findById(userId).select('userAnimeData.watched').select('favoriteAnime') as UserAPI;
        if (!user) throw new ValidationError('Nie znaleziono uzytkownika.');
        const isWatched = user.userAnimeData.watched.findIndex(a => a.anime.toString() === id) !== -1;
        const isFavourite = user.favoriteAnime.findIndex(a => a.anime.toString() === id) !== -1;
        const anime = await Anime.findById(id).select('rate') as AnimeAPI;
        if (!anime) throw new ValidationError('Nie znaleziono anime.');
        const rateIndex = anime.rate.findIndex(r => r.user.toString() === userId);
        const isRate = rateIndex !== -1;

        if (isFavourite) {
            if (isWatched) {
                if (isRate) {
                    const isRateSame = anime.rate[rateIndex].rate === rate;
                    await changeWatchedRate(id, userId, isRateSame ? 0 : rate);
                    await pullRate(id, userId);
                    if (!isRateSame) {
                        await pushRate(id, userId, rate);
                        await changeFavoriteRate(id, userId, rate);
                    } else {
                        await resetFavoriteRate(id, userId);
                    }
                } else {
                    await changeFavoriteRate(id, userId, rate);
                    await changeWatchedRate(id, userId, rate);
                    await pushRate(id, userId, rate);
                }
            } else {
                if (isRate) {
                    const isRateSame = anime.rate[rateIndex].rate === rate;
                    await changeFavoriteRate(id, userId, rate);
                    await pullRate(id, userId);
                    if (!isRateSame) {
                        await pushRate(id, userId, rate);
                    }
                } else {
                    await changeFavoriteRate(id, userId, rate);
                    await pushRate(id, userId, rate);
                }
            }
        } else if (isWatched) {
            if (isRate) {
                const isRateSame = anime.rate[rateIndex].rate === rate;
                await changeWatchedRate(id, userId, rate);
                await pullRate(id, userId);
                if (!isRateSame) {
                    await pushRate(id, userId, rate);
                }
            } else {
                await changeWatchedRate(id, userId, rate);
                await pushRate(id, userId, rate);
            }
        } else {
            if (isRate) {
                const isRateSame = anime.rate[rateIndex].rate === rate;
                await pullRate(id, userId);
                if (!isRateSame) {
                    await pushRate(id, userId, rate);
                }
            } else {
                await pushRate(id, userId, rate);
            }
        }
        const newAnime = await Anime.findById(id).select('rate') as AnimeAPI;
        await Anime.findByIdAndUpdate(id, { averageRate: newAnime.rate.length > 0 ? (newAnime.rate.reduce((p, a) => p + a.rate, 0) / newAnime.rate.length) : 0 });
        // setLoverAchievement(userID);
        // setHaterAchievement(userID);
        return 'Zmieniono ocenę anime.';
    }

    static async soundtrackLike(id: string, soundtrackId: string, userId: string): Promise<string> {
        const anime = await Anime.findById(id).select('soundtracks') as AnimeAPI;
        if (!anime) throw new ValidationError('Nie znaleziono anime.');
        const isLike = anime.soundtracks.find(s => s.id === soundtrackId).likes.findIndex(l => l.toString() === userId) !== -1;
        if (isLike) {
            await Anime.findByIdAndUpdate(id, { $pull: { 'soundtracks.$[element].likes': new Types.ObjectId(userId) } }, { arrayFilters: [{ 'element.id': soundtrackId }] });
        } else {
            await Anime.findByIdAndUpdate(id, { $push: { 'soundtracks.$[element].likes': new Types.ObjectId(userId) } }, { arrayFilters: [{ 'element.id': soundtrackId }] });
        }
        return 'Zmieniono like w soundtracku.'
    }

    static async newComment(id: string, userId: string, text: string): Promise<string> {
        await Anime.findByIdAndUpdate(id, { $push: { comments: { user: new Types.ObjectId(userId), text } } });
        return 'Dodano nowy komentarz.'
    }

    static async deleteComment(id: string, commentId: string): Promise<string> {
        await Anime.findByIdAndUpdate(id, { $pull: { comments: { id: commentId } } });
        return 'Komentarz został usunięty.';
    }

    static async likeComment(id: string, commentId: string, userId: string): Promise<string> {
        const anime: AnimeAPI = await Anime.findById(id).select('comments');
        const isLike = anime.comments.find(c => c.id === commentId).likes.findIndex(l => l.toString() === userId) !== -1;
        if (isLike) {
            await Anime.findByIdAndUpdate(id, { $pull: { 'comments.$[element].likes': new Types.ObjectId(userId) } }, { arrayFilters: [{ 'element.id': commentId }] });
        } else {
            await Anime.findByIdAndUpdate(id, { $push: { 'comments.$[element].likes': new Types.ObjectId(userId) } }, { arrayFilters: [{ 'element.id': commentId }] });
        }
        return 'Dodano lub usunięto like.';
    }

    static async getGalery(id: string): Promise<galeryAPI> {
        const anime = await Anime.findById(id).select('images.galeryImages').select('title') as AnimeAPI;
        if (!anime) throw new ValidationError('Nie znaleziono anime.');
        return {
            _id: id,
            images: anime.images.galeryImages,
            title: anime.title,
        };
    }

    static async backgroundEdit(id: string, src: string): Promise<string> {
        const anime = await Anime.findById(id).select('images.background') as AnimeAPI;
        if (!anime) throw new ValidationError('Nie znaleziono anime.');
        const actualSrc = anime.images.background.src;
        const news = await News.find().select('images') as NewsAPI[];
        const images = news.reduce((p, a) => [...p, ...a.images], [] as string[]);
        const isUsed = images.findIndex(i => i === actualSrc) !== -1;
        if (!isUsed) {
            await deleteFiles([actualSrc]);
        }
        await Anime.findByIdAndUpdate(id, { 'images.background.src': src, 'images.galeryImages.$[element].src': src }, { arrayFilters: [{ 'element.src': actualSrc }] });
        return 'Tło zostało zaktualizowane.';
    }

    static async banerEdit(id: string, src: string): Promise<string> {
        const anime = await Anime.findById(id).select('images.baner') as AnimeAPI;
        if (!anime) throw new ValidationError('Nie znaleziono anime.');
        const actualSrc = anime.images.baner.src;
        const news = await News.find().select('images') as NewsAPI[];
        const images = news.reduce((p, a) => [...p, ...a.images], [] as string[]);
        const isUsed = images.findIndex(i => i === actualSrc) !== -1;
        if (!isUsed) {
            await deleteFiles([actualSrc]);
        }
        await Anime.findByIdAndUpdate(id, { 'images.baner.src': src, 'images.galeryImages.$[element].src': src }, { arrayFilters: [{ 'element.src': actualSrc }] });
        return 'Baner został zaktualizowany.';
    }

    static async miniEdit(id: string, src: string): Promise<string> {
        const anime = await Anime.findById(id).select('images.mini') as AnimeAPI;
        if (!anime) throw new ValidationError('Nie znaleziono anime.');
        const actualSrc = anime.images.mini.src;
        const news = await News.find().select('images') as NewsAPI[];
        const images = news.reduce((p, a) => [...p, ...a.images], [] as string[]);
        const isUsed = images.findIndex(i => i === actualSrc) !== -1;
        if (!isUsed) {
            await deleteFiles([actualSrc]);
        }
        await Anime.findByIdAndUpdate(id, { 'images.mini.src': src, 'images.galeryImages.$[element].src': src }, { arrayFilters: [{ 'element.src': actualSrc }] });
        return 'Okładka została zaktualizowana.';
    }

    static async deleteSoundtrack(id: string, soundtrackId: string): Promise<string> {
        const anime = await Anime.findById(id).select('soundtracks') as AnimeAPI;
        if (!anime) throw new ValidationError('Nie znaleziono anime.');
        const soundtrack = anime.soundtracks.find(s => s.id === soundtrackId);
        const wtms = await WhatsTheMelody.find().sort({ createdAt: -1 }) as WhatsTheMelodyAPI[];
        if (wtms[0].src === soundtrack.src) throw new ValidationError('Nie można usunąć ścieżki dźwiękowej, która jest obecnie w "Jaka to Melodia".');
        if (anime.soundtracks.length < 2) throw new ValidationError('Anime musi posiadać conajmniej jeden soundtrack.');
        await Anime.findByIdAndUpdate(id, { $pull: { soundtracks: { id: soundtrackId } } });
        if (wtms.findIndex(w => w.src === soundtrack.src) === -1) {
            await deleteFiles([soundtrack.src]);
        }
        return 'Prawidłowo usunięto ścieżkę dźwiękową.';
    }

    static async addSoundtracks(id: string, uploadedFiles: string[], soundtracksPreview: AudioPreview[]): Promise<string> {
        await Anime.findByIdAndUpdate(id, { $push: { soundtracks: uploadedFiles.map((f, i) => ({ src: f, title: soundtracksPreview[i].title, composer: soundtracksPreview[i].composer })) } });
        return 'Dodano nowe ścieżki dźwiękowe.';
    }

    static async edit(id: string, data: AnimeEditEntity): Promise<string> {
        const errors = animeEditInformationsValidation(data as AnimeEditEntity);
        if (errors.length !== 0) throw new ValidationError('Nieprawidłowe dane.', errors);
        const { epizodeDuration, epizodesCount, hours, kind, minutes, productionYear, scenario, seasons, title, types, watchLink } = data;
        await Anime.findByIdAndUpdate(id, { $set: { info: { scenario, productionYear, duration: getDuration(kind, hours, minutes, epizodeDuration, epizodesCount) }, watchLink, kind, types, seasons, title } });
        return 'Zaktualizowano informacje o anime.';
    }
}
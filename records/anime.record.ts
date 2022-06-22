import { NextFunction } from "express";
import { Anime } from "../models/anime";
import { AnimeAPI, AnimeDescription, AnimeInfo, Comment, AnimeImagesObject, Rate, RecommendedAnimeAPI, Soundtrack, AnimePopulateAPI, AnimeForm, Kind, TypeAPI } from "../types";
import { AnimeCreateEntity } from "../types/formEntities";
import { deleteFiles } from "../utils/deleteImages";
import { getDuration } from "../utils/getDuration";

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

    static async create(data: AnimeCreateEntity, uploadedFiles: string[], next: NextFunction): Promise<string> {
        const { epizodeDuration, epizodesCount, hours, kind, minutes, productionYear, scenario, seasons, soundtracksPreview, title, watchLink, types } = data;
        try {
            const newAnime = await Anime.create({
                kind,
                title: title.trim().charAt(0).toUpperCase() + title.trim().slice(1),
                watchLink: watchLink.trim(),
                info: {
                    scenario,
                    productionDate: productionYear,
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
}
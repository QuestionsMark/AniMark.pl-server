import { decode } from "jsonwebtoken";
import { Types } from "mongoose";
import { ValidationError } from "../middlewares/error";
import { Anime } from "../models/anime";
import { News } from "../models/news";
import { AnimeAPI, CommentPopulate, NewsAPI, NewsCondensedAPI, Token } from "../types";
import { NewsEditEntity, NewsFormEntity, OtherLink } from "../types/formEntities";
import { deleteFiles } from "../utils/deleteImages";

export class NewsRecord implements NewsAPI {
    _id: string;
    title: string;
    description: string;
    images: string[];
    videos: string[];
    otherLinks: OtherLink[];
    views: number;
    viewers: string[];
    comments: CommentPopulate[];
    createdAt: Date;
    constructor(

    ) {

    }

    static async getLast(): Promise<NewsCondensedAPI[]> {
        const news: NewsAPI[] = await News.find().limit(3).sort({ 'createdAt': -1 });
        return news.map(({ _id, comments, createdAt, description, images, title, viewers, views }) => ({
            _id,
            comments: comments.length,
            createdAt,
            description,
            imageSrc: images[0],
            title,
            viewers,
            views,
        }));
    }

    static async bumpViews(id: string, token: string): Promise<void> {
        News.findByIdAndUpdate(id, { $inc: { 'views': 1 } });
        if (!token) return;
        const decoded = decode(token) as Token;
        console.log(decoded);
        const userId = decoded.userId;
        const news: NewsAPI = await News.findById(id).select('viewers');
        if (!news) return;
        if (news.viewers.findIndex(v => (v as any) === new Types.ObjectId(userId)) !== -1) return;
        News.findByIdAndUpdate(id, { $push: { viewers: new Types.ObjectId(userId) } });
    }

    static async getOne(id: string, token: string): Promise<NewsAPI | null> {
        const news = await News.findById(id).populate('comments.user', ['avatar', 'username']) as NewsAPI;
        if (!news) return null;
        const decoded = decode(token) as Token;
        if (decoded) {
            if (news.viewers.findIndex(v => v.toString() === decoded.userId) === -1) {
                await News.findByIdAndUpdate(id, { $push: { viewers: new Types.ObjectId(decoded.userId) } });
            }
        }
        await News.findByIdAndUpdate(id, { $inc: { views: 1 } });

        return news;
    }

    static async create(data: NewsFormEntity, uploaded: string[]): Promise<void> {
        const { choosedImages, description, otherLinks, title, videos } = data;
        await News.create({ description, title, images: [...uploaded, ...choosedImages], videos, otherLinks });
    }

    static async deleteImage(id: string, imageSrc: string): Promise<void> {
        const news = await News.findById(id).select('images') as NewsAPI;
        if (!news) throw new ValidationError('Nie znaleziono artykułu.');
        if (news.images.length < 2) throw new ValidationError('Artykuł musi zawierać conajmniej jedną grafikę.');
        const anime = await Anime.find().select('images.mini') as AnimeAPI[];
        const isChoosed = anime.findIndex(a => a.images.mini.src === imageSrc) !== -1;
        if (!isChoosed) {
            await deleteFiles([imageSrc]);
        }
        await News.findByIdAndUpdate(id, { $pull: { images: imageSrc } });
    }

    static async newComment(id: string, text: string, userId: string): Promise<void> {
        await News.findByIdAndUpdate(id, { $push: { comments: { user: new Types.ObjectId(userId), text } } });
    }

    static async deleteComment(id: string, commentId: string): Promise<string> {
        await News.findByIdAndUpdate(id, { $pull: { comments: { id: commentId } } });
        return 'Komentarz został usunięty.';
    }

    static async likeComment(id: string, commentId: string, userId: string): Promise<string> {
        const news: NewsAPI = await News.findById(id).select('comments');
        const isLike = news.comments.find(c => c.id === commentId).likes.findIndex(l => l.toString() === userId) !== -1;
        if (isLike) {
            await News.findByIdAndUpdate(id, { $pull: { 'comments.$[element].likes': new Types.ObjectId(userId) } }, { arrayFilters: [{ 'element.id': commentId }] });
        } else {
            await News.findByIdAndUpdate(id, { $push: { 'comments.$[element].likes': new Types.ObjectId(userId) } }, { arrayFilters: [{ 'element.id': commentId }] });
        }
        return 'Dodano lub usunięto like.';
    }

    static async edit(id: string, data: NewsEditEntity, uploaded: string[]): Promise<void> {
        const { choosedImages, description, otherLinks, title, videos, savedImages } = data;
        const news = await News.findById(id).select('createdAt').select('views').select('viewers').select('comments') as NewsAPI;
        if (!news) throw new ValidationError('Nie znaleziono artykułu.');
        const { createdAt, comments, viewers, views } = news;
        await News.findOneAndReplace({ _id: id }, { description, title, images: [...uploaded, ...choosedImages, ...savedImages], videos, otherLinks, comments, viewers, views, createdAt });
    }
}
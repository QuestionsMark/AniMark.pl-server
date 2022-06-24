import { decode } from "jsonwebtoken";
import { Types } from "mongoose";
import { News } from "../models/news";
import { CommentPopulate, NewsAPI, NewsCondensedAPI, Token } from "../types";
import { NewsFormEntity, OtherLink } from "../types/formEntities";
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

    static async getOne(id: string): Promise<NewsAPI | null> {
        const news = await News.findById(id).populate('comments.user', ['avatar', 'username']);
        if (!news) return null;
        return news;
    }

    static async create(data: NewsFormEntity, uploaded: string[]): Promise<void> {
        const { choosedImages, description, otherLinks, title, videos } = data;
        await News.create({ description, title, images: [...uploaded, ...choosedImages], videos, otherLinks });
    }

    static async deleteImage(id: string, imageSrc: string): Promise<void> {
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
}
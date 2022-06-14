import { Types } from "mongoose";
import { News } from "../models/news";
import { CommentPopulate, NewsAPI, NewsCondensedAPI, OtherLink } from "../types";

export class NewsRecord implements NewsAPI {
    _id: string;
    title: string;
    description: string;
    images: { src: string; }[];
    videos: { src: string; }[];
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
            imageSrc: images[0].src,
            title,
            viewers,
            views,
        }));
    }

    static async bumpViews(id: string, userId: string): Promise<void> {
        News.findByIdAndUpdate(id, { $inc: { 'views': 1 } });
        if (!userId) return;
        const news: NewsAPI = await News.findById(id).select('viewers');
        if (!news) return;
        if (news.viewers.findIndex(v => (v as any) === new Types.ObjectId(userId)) !== -1) return;
        News.findByIdAndUpdate(id, { $push: { viewers: new Types.ObjectId(userId) } });
    }

    static async getOne(id: string): Promise<NewsAPI | null> {
        const news: NewsAPI = await News.findById(id);
        if (!news) return null;
        return news;
    }
}
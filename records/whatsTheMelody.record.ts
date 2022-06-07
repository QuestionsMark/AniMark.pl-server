import { Types } from "mongoose";
import { WhatsTheMelody } from "../models/whatsTheMelody";
import { Comment, CommentPopulate, WhatsTheMelodyAPI, WhatsTheMelodyQuestion, WhatsTheMelodyResults, WTMVotes } from "../types";
import { v4 as uuid } from "uuid";

export class WhatsTheMelodyRecord implements WhatsTheMelodyAPI {
    _id: string;
    src: string;
    answears: string[];
    correctAnswear: string;
    votes: WTMVotes[];
    comments: Comment[];
    createdAt: Date;
    constructor(

    ) {

    }

    static async getActual(): Promise<WhatsTheMelodyQuestion | null> {
        const wtmLength = await WhatsTheMelody.countDocuments();
        const actualArr: WhatsTheMelodyAPI[] = await WhatsTheMelody.find().skip(wtmLength > 0 ? wtmLength - 1 : wtmLength);
        if (!(actualArr.length > 0)) return null;
        const { _id, answears, src, votes } = actualArr[0];
        return { _id, answears, src, votes };
    };

    static async getActualComments(): Promise<CommentPopulate[] | null> {
        const wtmLength = await WhatsTheMelody.countDocuments();
        const actualArr: WhatsTheMelodyAPI[] = await WhatsTheMelody.find().skip(wtmLength > 0 ? wtmLength - 1 : wtmLength).populate('comments.user', ['username', 'avatar']);
        if (!(actualArr.length > 0)) return null;
        return actualArr[0].comments;
    };

    static async getActualResults(): Promise<WhatsTheMelodyResults | null> {
        const wtmLength = await WhatsTheMelody.countDocuments();
        const actualArr: WhatsTheMelodyAPI[] = await WhatsTheMelody.find().skip(wtmLength > 0 ? wtmLength - 1 : wtmLength);
        if (!(actualArr.length > 0)) return null;
        const { _id, correctAnswear, src, votes } = actualArr[0];
        return { _id, correctAnswear, src, votes };
    }

    static async addNewComment(wtmId: string, userId: string, text: string): Promise<void> {
        await WhatsTheMelody.findByIdAndUpdate(wtmId, { $push: { comments: { user: new Types.ObjectId(userId), text, id: uuid() } } });
    };

    static async likeComment(wtmId: string, commentId: string, userId: string): Promise<void> {
        const wtm = await WhatsTheMelody.findById(wtmId);
        const commentIndex = (wtm.comments as Comment[]).findIndex(c => c.id === commentId);
        const likeIndex = (wtm.comments[commentIndex].likes as Types.ObjectId[]).findIndex(l => l.toString() === userId);
        if (likeIndex !== -1) {
            await WhatsTheMelody.findByIdAndUpdate(wtmId, { $pull: { 'comments.$[element].likes': new Types.ObjectId(userId) } }, { arrayFilters: [{ 'element.id': commentId }] });
            return;
        }
        await WhatsTheMelody.findByIdAndUpdate(wtmId, { $push: { 'comments.$[element].likes': new Types.ObjectId(userId) } }, { arrayFilters: [{ 'element.id': commentId }] });
    };

    static async deleteComment(wtmId: string, commentId: string): Promise<void> {
        await WhatsTheMelody.findByIdAndUpdate(wtmId, { $pull: { comments: { id: commentId } } });
    };

    static async addNewVote(userId: string, wtmId: string, vote: string): Promise<boolean> {
        // Sprawdzenie czy użytkownik już głosował...
        const wtm = await WhatsTheMelody.findById(wtmId);
        const votes: Types.ObjectId[] = wtm.votes.reduce((p: Types.ObjectId[], a: WTMVotes) => [...p, ...a.votes], []);
        const index = votes.findIndex(v => v.toString() === userId);
        if (index === -1) {
            await WhatsTheMelody.findByIdAndUpdate(wtmId, { $push: { 'votes.$[element].votes': new Types.ObjectId(userId) } }, { arrayFilters: [{ 'element.title': vote }] });
            return true;
        }
        return false;
        // Punkcik jeśli poprawna odpowiedź
    };
}
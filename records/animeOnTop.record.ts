import { AnimeOnTopAPI, AnimeOnTopPopulateAPI, AnimePopulateAPI, AOTVote } from "../types";
import { AnimeOnTop } from "../models/animeOnTop";
import { Anime } from "../models/anime";
import { Types } from "mongoose";

export class AnimeOnTopRecord implements AnimeOnTopAPI {
    _id: string;
    votes: AOTVote[];
    winner: string;
    createdAt: Date;
    constructor(

    ) {

    }

    static async getActual(): Promise<AnimeOnTopPopulateAPI | null> {
        const aotLength = await AnimeOnTop.countDocuments();
        const actualArr: AnimeOnTopAPI[] = await AnimeOnTop.find().skip(aotLength > 0 ? aotLength - 1 : aotLength);
        if (!(actualArr.length > 0)) return null;
        const { _id, createdAt, votes, winner } = actualArr[0];

        if (!winner) return { _id, createdAt, votes, winner: (winner as null) };
        const animeWinner = await Anime.findById(winner).populate('types').populate('seasons').populate('description.author', ['username']);
        const { _id: animeId, averageRate, description, images, likes, seasons, soundtracks, title, types, watchLink } = animeWinner as AnimePopulateAPI;

        return {
            _id,
            createdAt,
            votes,
            winner: {
                _id: animeId,
                image: images.mini,
                averageRate,
                likes: likes.length,
                title,
                types,
                description,
                soundtracks,
                watchLink,
                seasons: seasons.map(({ _id, images, title }) => ({ _id, image: images.background, title })),
            },
        };
    }

    static async vote(aotId: string, userId: string, vote: string): Promise<boolean> {
        const aot = await AnimeOnTop.findById(aotId);
        const votes: Types.ObjectId[] = aot.votes.reduce((p: Types.ObjectId[], a: AOTVote) => [...p, ...a.votes], []);
        const index = votes.findIndex(v => v.toString() === userId);
        if (index === -1) {
            const animeIndex = aot.votes.findIndex((v: AOTVote) => v.title === vote);
            if (animeIndex !== -1) {
                await AnimeOnTop.findByIdAndUpdate(aotId, { $push: { 'votes.$[element].votes': new Types.ObjectId(userId) } }, { arrayFilters: [{ 'element.title': vote }] });

            } else {
                await AnimeOnTop.findByIdAndUpdate(aotId, { $push: { votes: { title: vote, votes: [new Types.ObjectId(userId)] } } });
            }
            const newAot = await AnimeOnTop.findById(aotId);
            const newVotes: AOTVote[] = newAot.votes
                .reduce((p: AOTVote[], a: AOTVote) => [...p, a], [])
                .sort((a: AOTVote, b: AOTVote) => {
                    if (a.votes.length > b.votes.length) return -1;
                    if (a.votes.length < b.votes.length) return 1;
                    return 0;
                })
            const winners = newVotes.filter(v => v.votes.length === newVotes[0].votes.length);
            const winner = winners[Math.floor(Math.random() * winners.length)].title;
            const animeWinner = await Anime.findOne({ 'title': winner }).select('_id');
            await AnimeOnTop.findByIdAndUpdate(aotId, { $set: { winner: animeWinner._id } })
            return true;
        }
        return false;
    }

    static async setNew(): Promise<void> {
        await AnimeOnTop.create({ votes: [] });
    }
}
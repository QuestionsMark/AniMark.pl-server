import { model, Schema, SchemaTypes } from 'mongoose';

const animeOnTopSchema = new Schema({
    votes: {
        type: Array,
        default: [],
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    winner: {
        type: SchemaTypes.ObjectId,
        ref: "Anime",
    },
});

export const AnimeOnTop = model('AnimeOnTop', animeOnTopSchema);
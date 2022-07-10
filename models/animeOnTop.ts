import { model, Schema, SchemaTypes } from 'mongoose';

const animeOnTopSchema = new Schema({
    votes: [{
        title: {
            type: String,
            required: true,
        },
        votes: [{
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true,
        }],
    }],
    winner: {
        type: SchemaTypes.ObjectId,
        ref: "Anime",
        default: null,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
}, {
    timestamps: true,
});

export const AnimeOnTop = model('AnimeOnTop', animeOnTopSchema);
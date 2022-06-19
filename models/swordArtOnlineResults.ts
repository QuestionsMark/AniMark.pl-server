import { model, Schema } from 'mongoose';

const swordArtOnlineResultSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    completionTime: {
        type: String,
        required: true,
    },
    lvl: {
        type: Number,
        required: true,
    },
    achievements: {
        type: Number,
        required: true,
    },
    swords: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
})

export const SwordArtOnlineResult = model('SwordArtOnlineResult', swordArtOnlineResultSchema);
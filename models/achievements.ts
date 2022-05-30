import { model, Schema } from 'mongoose';

const achievementSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },
}, {
    timestamps: true,
});

export const Achievement = model('Achievement', achievementSchema);
import { model, Schema, SchemaTypes } from 'mongoose';

const newsSchema = new Schema({
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [{
        src: String,
    }],
    videos: [{
        src: {
            type: String,
            trim: true,
        },
    }],
    otherLinks: [{
        link: {
            type: String,
            trim: true,
        },
        note: {
            type: String,
            trim: true,
        },
    }],
    views: {
        type: Number,
        default: 0,
    },
    viewers: {
        type: [{
            type: SchemaTypes.ObjectId,
            ref: 'User',
        }],
        default: [],
    },
    comments: [{
        user: {
            type: SchemaTypes.ObjectId,
            ref: "User",
        },
        date: {
            type: Date,
            immutable: true,
            default: () => Date.now(),
        },
        text: {
            type: String,
            required: true,
        },
        likes: [{
            type: SchemaTypes.ObjectId,
            ref: "User",
        }],
    }],
});

export const News = model('News', newsSchema);
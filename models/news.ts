import { model, Schema, SchemaTypes } from 'mongoose';

const newsSchema = new Schema({
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
    viewers: [{
        type: SchemaTypes.ObjectId,
        ref: 'User',
    }],
    comments: [{
        user: {
            type: SchemaTypes.ObjectId,
            ref: "User",
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
            immutable: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
        likes: [{
            type: SchemaTypes.ObjectId,
            ref: "User",
        }],
    }],
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },
}, {
    timestamps: true,
});

export const News = model('News', newsSchema);
import { model, Schema, SchemaTypes } from 'mongoose';
import { v4 as uuid } from "uuid";

const animeSchema = new Schema({
    kind: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        index: { unique: true },
    },
    watchLink: {
        type: String,
        required: true,
    },
    info: {
        scenario: {
            type: String,
            required: true,
        },
        productionDate: {
            type: Number,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
    },
    types: [{
        type: SchemaTypes.ObjectId,
        ref: "Type",
    }],
    rate: [{
        user: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true,
        },
        rate: {
            type: Number,
            required: true,
        },
    }],
    averageRate: {
        type: Number,
        default: 0,
    },
    likes: [{
        type: SchemaTypes.ObjectId,
        ref: "User",
    }],
    images: {
        background: {
            src: {
                type: String,
                required: true,
            },
            fromAnime: {
                type: String,
                required: true,
            },
        },
        baner: {
            src: {
                type: String,
                required: true,
            },
            fromAnime: {
                type: String,
                required: true,
            },
        },
        mini: {
            src: {
                type: String,
                required: true,
            },
            fromAnime: {
                type: String,
                required: true,
            },
        },
        galeryImages: [{
            src: {
                type: String,
                required: true,
            },
            fromAnime: {
                type: String,
                required: true,
            },
        }],
    },
    soundtracks: [{
        id: {
            type: String,
            default: () => uuid(),
        },
        src: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        composer: {
            type: String,
            required: true,
        },
        likes: [{
            type: SchemaTypes.ObjectId,
            ref: "User",
        }],
    }],
    description: {
        author: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
        },
    },
    seasons: [{
        type: SchemaTypes.ObjectId,
        ref: "Anime",
    }],
    comments: [{
        id: {
            type: String,
            default: () => uuid(),
        },
        user: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true,
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
        default: () => Date.now(),
        immutable: true,
    },
}, {
    timestamps: true,
});

export const Anime = model('Anime', animeSchema);
import { model, Schema, SchemaTypes } from 'mongoose';

const animeSchema = new Schema({
    kind: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    watchLink: {
        type: String,
        required: true,
    },
    info: {
        scenario: String,
        productionDate: Number,
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
        userId: {
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
        authorName: {
            type: String,
            default: "Brak Autora",
            //...
        },
        authorId: {
            type: String,
            default: "Brak Autora",
            //...
        },
        description: {
            type: String,
            default: "Brak Autora",
            //...
        },
    },
    seasons: [{
        type: SchemaTypes.ObjectId,
        ref: "Anime",
    }],
    comments: [{
        user: {
            type: SchemaTypes.ObjectId,
            ref: "User",
        },
        date: {
            type: Date,
            default: Date.now(),
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
}, {
    timestamps: true,
});

export const Anime = model('Anime', animeSchema);
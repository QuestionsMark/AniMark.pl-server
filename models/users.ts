import { Document, Model, model, Schema, SchemaTypes } from 'mongoose';
import bcrypt from 'bcrypt';
import { AchievementAPI, FavoriteAnime, Introduction, Points, RoleEnum, TypeAPI, UserAnimeData, UserAPI } from '../types';

export interface UserModel extends Document {
    email: string;
    login: string;
    password: string;
    rank: number;
    username: string;
    avatar: string;
    background: string;
    customBackgrounds: {
        src: string;
    }[];
    likes: string[];
    achievements: string[];
    points: Points;
    userAnimeData: UserAnimeData;
    introduction: Introduction;
    favoriteAnime: FavoriteAnime[];
    favoriteType: string;
    createdAt: Date;
    passwordMatches: (password: string) => Promise<boolean>;
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: { unique: true },
        trim: true,
    },
    login: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    rank: {
        type: Number,
        default: RoleEnum.User,
    },
    username: {
        type: String,
        required: true,
        index: { unique: true },
        trim: true,
    },
    avatar: {
        type: String,
        default: "guest.png",
    },
    background: {
        type: String,
        default: "background.png",
    },
    customBackgrounds: [String],
    likes: [{
        type: SchemaTypes.ObjectId,
        ref: "User",
    }],
    achievements: [{
        type: SchemaTypes.ObjectId,
        ref: 'Achievement',
    }],
    points: {
        type: Object,
        required: true,
    },
    userAnimeData: {
        planned: [{
            type: SchemaTypes.ObjectId,
            ref: 'Anime',
        }],
        processOfWatching: [{
            type: SchemaTypes.ObjectId,
            ref: 'Anime',
        }],
        stopped: [{
            type: SchemaTypes.ObjectId,
            ref: 'Anime',
        }],
        watched: [{
            anime: {
                type: SchemaTypes.ObjectId,
                ref: 'Anime',
            },
            rate: {
                type: Number,
                default: 0,
            },
        }],
    },
    introduction: {
        type: Object,
        required: true,
    },
    favoriteAnime: [{
        anime: {
            type: SchemaTypes.ObjectId,
            ref: "Anime",
        },
        rate: {
            type: Number,
            required: true,
        }
    }],
    favoriteType: {
        type: SchemaTypes.ObjectId,
        ref: "Type",
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },
}, {
    timestamps: true,
});

userSchema.methods.passwordMatches = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

export const User: Model<UserModel> = model('User', userSchema);
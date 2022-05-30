import { model, Schema, SchemaTypes } from 'mongoose';
import bcrypt from 'bcrypt';

enum RoleEnum {
    User,
    Moderator,
    Admin,
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
    customBackgrounds: {
        type: Array,
        default: [],
    },
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

export const User = model('User', userSchema);
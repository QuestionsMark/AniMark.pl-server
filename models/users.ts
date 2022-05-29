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
    likes: {
        type: Array,
        default: [],
    },
    profileLikes: {
        type: Array,
        default: [],
    },
    achievements: [{
        type: SchemaTypes.ObjectId,
        ref: 'Achievement',
    }],
    points: {
        type: Object,
        default: {
            //...
        }
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
        default: {
            //...
        },
    },
    favoriteAnime: {
        type: Array,
        default: [],
    },
    favoriteType: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

userSchema.methods.passwordMatches = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

export const User = model('User', userSchema);
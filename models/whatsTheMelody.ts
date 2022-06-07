import { model, Schema, SchemaTypes } from 'mongoose';
import { v4 as uuid } from "uuid";

const whatsTheMelodySchema = new Schema({
    src: {
        type: String,
        required: true,
    },
    answears: {
        type: Array,
        required: true,
    },
    correctAnswear: {
        type: String,
        required: true,
    },
    votes: {
        type: Array,
        default: [],
    },
    comments: [{
        id: {
            type: String,
            required: true,
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
        default: Date.now(),
        immutable: true,
    },
}, {
    timestamps: true,
});

export const WhatsTheMelody = model('WhatsTheMelody', whatsTheMelodySchema);
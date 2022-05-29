import { model, Schema, SchemaTypes } from 'mongoose';

const whatsTheMelodySchema = new Schema({
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
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
            trim: true,
        },
        likes: [{
            type: SchemaTypes.ObjectId,
            ref: "User",
        }],
    }]
});

export const WhatsTheMelody = model('WhatsTheMelody', whatsTheMelodySchema);
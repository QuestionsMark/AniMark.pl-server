import { model, Schema, SchemaTypes } from 'mongoose';

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

export const WhatsTheMelody = model('WhatsTheMelody', whatsTheMelodySchema);
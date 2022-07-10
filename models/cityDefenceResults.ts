import { model, Schema } from "mongoose";

const cityDefenceResultSchema = new Schema({
    accuracy: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    points: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
});

export const CityDefenceResult = model('CityDefenceResult', cityDefenceResultSchema);
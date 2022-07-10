import { model, Schema } from "mongoose";

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgSrc: {
        type: String,
        required: true,
    },
    links: [{
        src: {
            type: String,
            required: true,
            trim: true,
        },
        note: {
            type: String,
            trim: true,
        },
    }],
    otherLinks: [{
        src: {
            type: String,
            required: true,
            trim: true,
        },
        note: {
            type: String,
            trim: true,
        },
    }],
    technologies: [String],
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
}, {
    timestamps: true,
})

export const Project = model('Project', projectSchema);
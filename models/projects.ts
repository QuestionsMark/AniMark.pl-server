import { model, Schema } from "mongoose";

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    description: {
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        required: true,
    },
    otherLinks: [{
        link: {
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
}, {
    timestamps: true,
})

export const Project = model('Project', projectSchema);
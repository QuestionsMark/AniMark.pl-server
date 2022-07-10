import { model, Schema } from "mongoose";

const onlineUserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        default: null,
    },
    socketId: {
        type: String,
        required: true,
    },
});

export const OnlineUser = model('OnlineUser', onlineUserSchema);
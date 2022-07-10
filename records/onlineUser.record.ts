import { OnlineUser } from "../models/onlineUsers";
import { User } from "../models/users";
import { OnlineUserAPI, UserAPI } from "../types";

export class OnlineUserRecord implements OnlineUserAPI {
    _id: string;
    avatar: string;
    link?: string;
    username: string;
    socketId: string;

    static async delete(socketId: string): Promise<void> {
        await OnlineUser.deleteOne({ socketId });
    }

    static async deleteAll(): Promise<void> {
        await OnlineUser.deleteMany({});
    }

    static async set(socketId: string, userId: string): Promise<void> {
        const onlineUser = await OnlineUser.findOne({ socketId });
        const user = await User.findById(userId).select('username').select('avatar') as UserAPI;
        if (!onlineUser) {
            if (!user) {
                await OnlineUser.create({ socketId, username: 'Gość', avatar: 'guest.png' });
                return;
            }
            const { avatar, username, _id } = user;
            await OnlineUser.create({ socketId, username, avatar, link: _id.toString() });
            return;
        }
        if (!user) {
            await OnlineUser.findOneAndUpdate({ socketId }, { $set: { avatar: 'guest.png', username: 'Gość', link: null } });
            return;
        }
        const { avatar, username, _id } = user;
        await OnlineUser.findOneAndUpdate({ socketId }, { $set: { avatar, username, link: _id.toString() } });
    }

}
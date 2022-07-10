export interface OnlineUserAPI {
    _id: string;
    avatar: string;
    link?: string;
    username: string;
    socketId: string;
}

export interface OnlineUserCondensedAPI {
    _id: string;
    avatar: string;
    link?: string;
    username: string;
}
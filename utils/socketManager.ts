import fetch from "node-fetch";
import { HOST_ADDRESS } from "../config/config";
import { io } from "../index";

export const socketManager = async () => {
    // const onlineUsers = [];

    io.on('connection', socket => {
        // socket.broadcast.emit('user-connected', `Użytkownik ${socket.client.id} dołączył!`);
        socket.on('disconnect', () => {
            // onlineUsers.splice(onlineUsers.findIndex(u => u.socketId === socket.id), 1);
            // socket.broadcast.emit('online-users-changed');
        });
        socket.on('set-user', async ({ userId }) => {
            // const response = await fetch(`${HOST_ADDRESS}/users/${userId}/comment-info`);
            // if (response.ok) {
            //     const { username, avatar } = await response.json();
            //     onlineUsers.push({ id: userId, socketId: socket.id, username, avatar });
            // } else {
            //     onlineUsers.push({ id: userId, socketId: socket.id, username: 'Guest', avatar: null });
            // }
            // io.emit('online-users-changed');
        });

        socket.on('get-online-users', () => {
            // socket.emit('get-online-users', {
            //     onlineUsers,
            // });
        });

        socket.on('whats-the-melody-new-comment', () => {
            socket.broadcast.emit('whats-the-melody-new-comment');
        });
        socket.on('whats-the-melody-delete-comment', () => {
            io.emit('whats-the-melody-refresh');
        });
        socket.on('whats-the-melody-roll', () => {
            io.emit('whats-the-melody-roll');
        });
        socket.on('whats-the-melody-new-vote', () => {
            io.emit('whats-the-melody-refresh');
        });
        socket.on('whats-the-melody-comment-like', () => {
            io.emit('whats-the-melody-comment-like');
        });
    });
}
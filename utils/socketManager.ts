import { io } from "../index";
import { OnlineUserRecord, WhatsTheMelodyRecord } from "../records";
import { NewComment, NewVote, UpdateComment } from "../types";
import { checkSocketAuthorization } from "./checkSocketAuthorization";
import { socketResponseErrorHelper } from "./responseHelper";
import { socketErrorHandler } from "./socketError";

export const socketManager = async () => {
    io.on('connection', socket => {
        socket.broadcast.emit('user-connected', `Użytkownik ${socket.id} dołączył!`);
        socket.on('disconnect', async () => {
            await OnlineUserRecord.delete(socket.id);
            io.emit('online-users__refresh');
        });
        socket.on('online-users__new', async ({ userId }) => {
            await OnlineUserRecord.set(socket.id, userId);
            io.emit('online-users__refresh');
        });

        socket.on('new-comment', async ({ text, token, collection, collectionId }: NewComment) => {
            const userId = checkSocketAuthorization(token, { io, socket });
            if (!userId) return;
            try {
                switch (collection) {
                    case 'ANIME':
                        break;
                    case 'NEWS':
                        break;
                    case 'WHATS_THE_MELODY':
                        await WhatsTheMelodyRecord.addNewComment(collectionId, userId, text);
                        io.to(socket.id).emit('whats-the-melody__your-new-comment');
                        socket.broadcast.emit('whats-the-melody__new-comment');
                        break;
                }
            } catch (err) {
                socketErrorHandler(err, { io, socket });
            }
        });

        socket.on('whats-the-melody__new-vote', async ({ token, wtmId, vote }: NewVote) => {
            try {
                const userId = checkSocketAuthorization(token, { io, socket });
                if (!userId) return;
                const result = await WhatsTheMelodyRecord.addNewVote(userId, wtmId, vote);
                if (!result) return io.to(socket.id).emit('socket-error', socketResponseErrorHelper('Ej no weź! Głosowałeś już ty oszukisto! :('));
                socket.broadcast.emit('whats-the-melody__new-vote');
                io.to(socket.id).emit('whats-the-melody__your-new-vote');
            } catch (err) {
                socketErrorHandler(err, { io, socket });
            }
        });

        socket.on('comment-delete', async ({ collection, collectionId, commentId, token }: UpdateComment) => {
            const userId = checkSocketAuthorization(token, { io, socket }, [1, 2]);
            if (!userId) return;
            try {
                switch (collection) {
                    case 'ANIME':
                        break;
                    case 'NEWS':
                        break;
                    case 'WHATS_THE_MELODY':
                        await WhatsTheMelodyRecord.deleteComment(collectionId, commentId);
                        io.emit('whats-the-melody__comments-refresh');
                        break;
                }
            } catch (err) {
                socketErrorHandler(err, { io, socket });
            }
        });

        socket.on('new-comment-like', async ({ collection, collectionId, commentId, token }: UpdateComment) => {
            const userId = checkSocketAuthorization(token, { io, socket });
            if (!userId) return;
            try {
                switch (collection) {
                    case 'ANIME':
                        break;
                    case 'NEWS':
                        break;
                    case 'WHATS_THE_MELODY':
                        await WhatsTheMelodyRecord.likeComment(collectionId, commentId, userId);
                        io.emit('whats-the-melody__comments-refresh');
                        break;
                }
            } catch (err) {
                socketErrorHandler(err, { io, socket });
            }
        });

        socket.on('whats-the-melody__set-new', async ({ token }) => {
            const userId = checkSocketAuthorization(token, { io, socket }, [2]);
            if (!userId) return;
            try {
                await WhatsTheMelodyRecord.setNew();
                io.emit('whats-the-melody__new');
            } catch (err) {
                socketErrorHandler(err, { io, socket });
            }
        });
    });
}
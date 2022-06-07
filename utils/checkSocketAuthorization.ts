import { JsonWebTokenError, TokenExpiredError, verify } from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config";
import { ValidationError } from "../middlewares/error";
import { RoleEnum, SocketProps, Token } from "../types";

export const checkSocketAuthorization = (token: string, socketProps: SocketProps, rank: RoleEnum[] = [0, 1, 2]): string | null => {
    try {
        const verified = verify(token, TOKEN_SECRET) as Token;
        if (!rank.includes(verified.rank)) throw new ValidationError('Brak autoryzacji.');
        return verified.userId;
    } catch (err) {
        const { io, socket } = socketProps;
        if (err instanceof ValidationError) {
            io.to(socket.id).emit('socket-error', { message: err.message });
        }

        if (err instanceof TokenExpiredError) {
            io.to(socket.id).emit('socket-error', { message: 'Twoja sesja wygasła.' });
        }

        if (err instanceof JsonWebTokenError) {
            io.to(socket.id).emit('socket-error', { message: 'Nieprawidłowy token dostępu!' });
        }
        return null;
    }
};
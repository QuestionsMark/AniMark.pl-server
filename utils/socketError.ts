import { ValidationError } from "../middlewares/error";
import { SocketProps } from "../types";
import { socketResponseErrorHelper } from "./responseHelper";

export const socketErrorHandler = (err: Error, socketProps: SocketProps) => {
    console.error(err);
    const { io, socket } = socketProps;
    if (err instanceof ValidationError) {
        io.to(socket.id).emit('socket-error', socketResponseErrorHelper(err.message, err.errors));
        return;
    }
    io.to(socket.id).emit('socket-error', socketResponseErrorHelper('Przepraszamy spróbuj ponownie później!'));
};
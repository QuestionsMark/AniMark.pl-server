import { Server, Socket } from "socket.io";

export interface SocketProps {
    io: Server;
    socket: Socket;
}
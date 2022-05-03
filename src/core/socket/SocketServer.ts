import { Server } from "socket.io";
import { server } from "../../../server";
import WebSocket from "../../utils/WebSocket";

export const SocketServer = () => {
  const ioServer =  new Server(server); 
  ioServer.on('connection', WebSocket.connection);
  return ioServer; // return a new instance of the socket server
}
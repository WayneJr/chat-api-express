class WebSocket {
  users: any[] = [];
  connection(client: any) {
    // Event that is fired when the chat room is disconnected
    client.on('disconnect', () => {
      this.users = this.users.filter((user: any) => user.socketId !== client.id);
    });

    // add the identity of the user mapped to the socket id
    client.on('identity', (userId: any) => {
      this.users.push({
        socketId: client.id,
        userId
      });
    });

    // subscribe person to chat and other user as well
    client.on('subscribe', (room: any, otherUserId: any = '') => {
      this.subscribeOtherUser(room, otherUserId);
      client.join(room);
    });

    // mute a chat room
    client.on('unsubscribe', (room: any) => {
      client.leave(room);
    });
  }

  subscribeOtherUser(room: any, otherUserId: any) {
    const userSockets = this.users.filter((user) => {
      return user.userId === otherUserId
    });

    userSockets.map((userInfo: any) => {
      const socketConn = global.io.sockets.connected(userInfo.socketId);
      if (socketConn) socketConn.join(room);
    });
  }
}

export default new WebSocket();
import { createServer } from "http";
import { Server } from "socket.io";

import { config } from "dotenv";
config();

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: process.env.ORIGIN
  }
});

const port = 4000
httpServer.listen(port, () => {
	console.log(`Application running on port ${port}`)
})

io.on("connect", (socket) => {
  console.log(process.env.ORIGIN)
  socket.on("createRoom", (roomId) => {
    if(!socket.rooms.has(roomId)) {
      socket.join(roomId);
    }
  })
  socket.on("sendMessage", (message) => {
    socket.to(message.uuid).emit("broadcastMessage", message)
  })
})
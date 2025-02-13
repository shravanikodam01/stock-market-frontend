import { io } from "socket.io-client";

const SOCKET_URL = "https://stock-market-backend-hdv7.onrender.com"; // Ensure this matches your backend

export const socket = io(SOCKET_URL, { transports: ["websocket"] });

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
});

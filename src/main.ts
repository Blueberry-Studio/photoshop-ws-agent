import setText from "./actions/action-set-text";
const io = require("socket.io-client");

let socket = null;

async function connect() {
  console.log("[WS Agent] ✅ Plugin loaded!");

  try {
    socket = io("ws://localhost:3000", {
      path: "/bridge",
      transports: ["websocket"],
      timeout: 5000,
      reconnection: true,
      reconnectionDelay: 2000,
      reconnectionAttempts: 3,
    });
    socket.on("connect", () => {
      console.log("[WS Agent] Connected to server");
    });

    socket.on("message", (data: unknown) => {
      console.log("[WS Agent] Message from server:", data);
    });

    socket.on("create_caroussel", (data: unknown) => {
      console.log("[WS Agent] Create caroussel command received:", data.text);
      setText(data.text);
    });

    socket.on("disconnect", () => {
      console.log("[WS Agent] Disconnected from server");
    });

    socket.on("error", (err: unknown) => {
      console.error("[WS Agent] Socket error:", err);
    });

    socket.on("connect_error", (err: any) => {
      console.error("[WS Agent] ❌ Connection failed:", err.message);
      console.error(err);
    });

    console.log("[WS Agent] Connecting to server...");
  } catch (err) {
    console.error("[WS Agent] Error:", err);
  }
}
module.exports = {
  commands: { connect },
};

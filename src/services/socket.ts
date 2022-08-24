import { io } from "socket.io-client";

const socket = io("https://front-end-task-7.herokuapp.com/", {
  query: {
    username: localStorage.getItem("playerName"),
  },
});

export default socket;

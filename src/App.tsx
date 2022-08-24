import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

import SignIn from "./components/SignIn";
import Buttons from './components/Buttons';
import Result from './components/Result';

const App = () => {
  const [ws, setSocket] = useState<any>();
  const [playerName, setPlayerName] = useState<string | null>(localStorage.getItem("playerName"));
  const [opponentName, setOpponentName] = useState<string>();
  const [isOpppentChoise, setIsOpponentChoice] = useState<boolean>(false);

  console.count("app")

  useEffect(() => {
    if (!playerName) return;

    const socket = io("https://front-end-task-7.herokuapp.com/", {
      query: {
        username: playerName,
      },
    });

    setSocket(socket)

    socket.on("connected", (playerOpponent: { username: string }) => {
      setOpponentName(playerOpponent.username)
      console.log("connected: ", playerOpponent); 
    });

    socket.on("disconnected", (playerOpponent: { username: string }) => {
      setOpponentName('')
      console.log("disconnected: ", playerOpponent); 
    });

    socket.on("players_received", (players: string[]) => {
      console.log("players: ", players); // ['Player_1_name', 'Player_2_name']
      setOpponentName(players.filter((name) => name !== playerName)[0])
    });

    socket.on("opponent_made_choice", (playerOpponent) => {
      setIsOpponentChoice(true)
      console.log("opponent_made_choice: ", playerOpponent); // ['Player_1_name', 'Player_2_name']
    });

    socket.on("game_finished", (players) => {
      setIsOpponentChoice(false);
      console.log("finished: ", players); // ['Player_1_name', 'Player_2_name']
    });

    socket.emit("get_players");

    return () => {
      socket.off("connected");
      socket.off("disconnected");
      socket.off("players_received");
      socket.off("opponent_made_choice");
      socket.off("game_finished");
    }
  }, [playerName]);

  if (!playerName) {
    return <SignIn afterAuth={(userName) => setPlayerName(userName)} />
  }

  return ws ? (
    <div>
      <div>Player: <b>{playerName}</b></div>
      <div>Opponent: <b>{opponentName || 'Waiting...'}</b> {isOpppentChoise && 'made a choice'}</div>
      <hr/>
      <Buttons socket={ws} />
      <hr/>
      <Result />
    </div>
  ) : <>No Connection</>;
};

export default App;

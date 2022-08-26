import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

import gameResult from "./services/gameResult";
import SignIn from "./components/SignIn";
import Buttons from "./components/Buttons";
import Result from "./components/Result";
import Players from "./components/Players";
import "./App.css";

const App = () => {
  const [ws, setSocket] = useState<any>();
  const [playerName, setPlayerName] = useState<string | null>(
    localStorage.getItem("playerName")
  );
  const [opponentName, setOpponentName] = useState<string>("");
  const [isOpppentChoise, setIsOpponentChoice] = useState<boolean>(false);

  const [opponentChoice, setOpponentChoice] = useState<string>("bla");

  console.count("app");

  useEffect(() => {
    if (!playerName) return;

    const socket = io("https://front-end-task-7.herokuapp.com/", {
      query: {
        username: playerName,
      },
    });

    setSocket(socket);

    socket.on("connected", (playerOpponent: { username: string }) => {
      setOpponentName(playerOpponent.username);
      console.log("connected: ", playerOpponent);
    });

    socket.on("disconnected", (playerOpponent: { username: string }) => {
      setOpponentName("");
      console.log("disconnected: ", playerOpponent);
    });

    socket.on("players_received", (players: string[]) => {
      console.log("players: ", players);
      setOpponentName(players.filter((name) => name !== playerName)[0]);
    });

    socket.on("opponent_made_choice", (playerOpponent: boolean) => {
      setIsOpponentChoice(true);
      console.log("opponent_made_choice: ", playerOpponent);
    });

    socket.on("game_finished", (game) => {
      setIsOpponentChoice(false);
      // const nameOfwinner = gameResult(game.results);

      // if (nameOfwinner === null) console.log("Its a draw");
      // else console.log(nameOfwinner === playerName ? "You win" : "You lose");

      console.log("finished: ", game);
    });

    socket.emit("get_players");

    return () => {
      socket.off("connected");
      socket.off("disconnected");
      socket.off("players_received");
      socket.off("opponent_made_choice");
      socket.off("game_finished");
    };
  }, [playerName]);

  if (!playerName) {
    return <SignIn afterAuth={(userName) => setPlayerName(userName)} />;
  }

  return ws ? (
    <div className="main_container">
      <Players
        playerName={playerName}
        opponentName={opponentName}
        isOpppentChoise={isOpppentChoise}
      />
      <Buttons socket={ws} />
      {opponentName ? <Result socket={ws} playerName={playerName} opponentName={opponentName} /> : <p>Waiting for an opponent</p>}
    </div>
  ) : (
    <>No Connection</>
  );
};

export default App;

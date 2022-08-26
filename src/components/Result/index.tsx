import React, { useState, useEffect } from "react";
import gameResult from "../../services/gameResult";

type ResultProps = {
  socket: any,
  playerName: string,
  opponentName: string
}

const Result = ({socket,playerName,opponentName}:ResultProps) => {
  const [totalGames,setTotalGames] = useState<number>(0);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const [numberOfDraws, setNumberOfDraws] = useState<number>(0);
  const [message, setMessage] = useState<string>()

  

  useEffect(()=>{
    socket.on("game_finished", (game:any) => {
      
      const nameOfwinner = gameResult(game.results);
      
      setTotalGames(totalGames + 1)

      if(nameOfwinner === null){
        setNumberOfDraws(numberOfDraws + 1);
        setMessage("Its a draw!")
      }else if(nameOfwinner === playerName){
        setPlayerScore(playerScore + 1);
        setMessage("You win!")
      }else if(nameOfwinner !== playerName){
        setOpponentScore(opponentScore + 1);
        setMessage("You lose!")
      }
    });
  },[totalGames,playerScore,opponentScore,numberOfDraws])

  return (
    <div>
        <h3>Result: {message}</h3>
        <ul>
          <li>Total games: {totalGames}</li>
          <li>{playerName}: {playerScore}</li>
          <li>{opponentName}: {opponentScore}</li>
          <li>Draws: {numberOfDraws}</li>
        </ul>        
    </div>
  );
};

export default Result;

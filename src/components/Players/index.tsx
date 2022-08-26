import React from "react";

type Props = {
  playerName: string,
  opponentName: string,
  isOpppentChoise: boolean
}

const Players = ({playerName, opponentName, isOpppentChoise}:Props) => {
  return (
    <div>
      <div>
        Player: {playerName}
      </div>
      <div>
        {opponentName? "Opponent: " + opponentName : "No Opponent"}
        {isOpppentChoise && " made a choice"}
      </div>
    </div>
  );
};

export default Players;

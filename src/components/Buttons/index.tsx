import React, { useState, useEffect } from "react";

const CHOISES: string[] = ["paper", "scissors", "rock"];

type Props = {
  socket: any
}

const Buttons = ({ socket }: Props) => {
  const [playerChoise, setPlayerChoice] = useState<string | null>();

  const handleClick = (value: string) => {
    setPlayerChoice(value);
    socket.emit("choose", value);
  };

  useEffect(() => {
    socket.on("game_finished", () => setPlayerChoice(null));

    return () => socket.off("game_finished")
  }, [])

  return (
    <div>
      {CHOISES.map((choise) => (
        <button key={`button-${choise}`} onClick={() => handleClick(choise)}>
          {choise} {playerChoise === choise && '(my choice)'}
        </button>
      ))}
    </div>
  );
};

export default Buttons;

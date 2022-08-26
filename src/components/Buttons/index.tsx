import React, { useState, useEffect } from "react";
import "./buttons.component.styles.css";

const CHOICES: string[] = ["paper", "scissors", "rock"];

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
    <div className="choices_container">
      <div className="buttons_choices_container">
        {CHOICES.map((choice) => (
          <button className="choices_buttons" key={`button-${choice}`} onClick={() => handleClick(choice)}>
            {choice} {playerChoise === choice}
          </button>
        ))}
      </div>
      <p className="choice_p">Your choice is: <span className="choice">{playerChoise}</span></p>
      </div>
  );
};

export default Buttons;

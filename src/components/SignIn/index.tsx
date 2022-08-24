import React, { useState } from "react";

type Props = {
  afterAuth: (name: string) => void
}

const SignIn = ({ afterAuth }: Props) => {
  const [playerName, setPlayerName] = useState(() => {
    const saved = localStorage.getItem("playerName");
    return saved || "";
  });

  const submitForm = () => {
    afterAuth(playerName);
    localStorage.setItem("playerName", playerName);
  }

  return (
    <div>
      <form>
        <input
          onChange={(event) => setPlayerName(event.target.value)}
          type="text"
        />
        <input type="submit" value="Submit" onClick={submitForm}></input>
      </form>
    </div>
  );
};

export default SignIn;

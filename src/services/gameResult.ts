type GameRule = {
  [choise1: string]: {
    [choise2: string]: number
  }
}

const gameRule: GameRule = {
  paper: {
    paper: 0,
    rock: 1,
    scissors: -1
  },
  rock: {
    paper: -1,
    rock: 0,
    scissors: 1
  },
  scissors: {
    paper: 1,
    rock: -1,
    scissors: 0
  }
}

type Choise = {
  username: string
  choice: string
}

const gameResult = (result: Choise[]): string | null => {
  const player1 = result[0];
  const player2 = result[1];

  switch (gameRule[player1.choice][player2.choice]) {
    case 1:
      return player1.username;

    case 0:
      return null;

    default: // -1
      return player2.username;
  }
}

export default gameResult;

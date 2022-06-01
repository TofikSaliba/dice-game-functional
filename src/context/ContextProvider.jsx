import { createContext, useState, useContext } from "react";

export const diceContext = createContext();

export const useCurrentDiceRoll = () => {
  const { currentDiceRoll, setCurrentDiceRoll } = useContext(diceContext);
  return { currentDiceRoll, setCurrentDiceRoll };
};

export const usePlayerTurn = () => {
  const { playerTurn, setPlayerTurn } = useContext(diceContext);
  return { playerTurn, setPlayerTurn };
};

export const usePlayerCurrentScore = () => {
  const { playerCurrentScore, setPlayerCurrentScore } = useContext(diceContext);
  return { playerCurrentScore, setPlayerCurrentScore };
};

export const usePlayer1Name = () => {
  const { player1Name, setPlayer1Name } = useContext(diceContext);
  return { player1Name, setPlayer1Name };
};

export const usePlayer2Name = () => {
  const { player2Name, setPlayer2Name } = useContext(diceContext);
  return { player2Name, setPlayer2Name };
};

export const useTotalScore1 = () => {
  const { totalScore1, setTotalScore1 } = useContext(diceContext);
  return { totalScore1, setTotalScore1 };
};

export const useTotalScore2 = () => {
  const { totalScore2, setTotalScore2 } = useContext(diceContext);
  return { totalScore2, setTotalScore2 };
};

export const useP1Wins = () => {
  const { p1Wins, setP1Wins } = useContext(diceContext);
  return { p1Wins, setP1Wins };
};

export const useP2Wins = () => {
  const { p2Wins, setP2Wins } = useContext(diceContext);
  return { p2Wins, setP2Wins };
};

export const useIsRollBtnDisabled = () => {
  const { isRollBtnDisabled, setIsRollBtnDisabled } = useContext(diceContext);
  return { isRollBtnDisabled, setIsRollBtnDisabled };
};

export const useIsGameOver = () => {
  const { isGameOver, setIsGameOver } = useContext(diceContext);
  return { isGameOver, setIsGameOver };
};

export const useResetGame = () => {
  const { resetGame, setResetGame } = useContext(diceContext);
  return { resetGame, setResetGame };
};

export const useWinnerMsg = () => {
  const { winnerMsg, setWinnerMsg } = useContext(diceContext);
  return { winnerMsg, setWinnerMsg };
};

export const useRollFuncs = () => {
  const { rollFuncs, setRollFuncs } = useContext(diceContext);
  return { rollFuncs, setRollFuncs };
};

export const useScoreGoal = () => {
  const { scoreGoal, setScoreGoal } = useContext(diceContext);
  return { scoreGoal, setScoreGoal };
};

function ContextProvider({ children }) {
  const [currentDiceRoll, setCurrentDiceRoll] = useState([0, 0]);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [playerCurrentScore, setPlayerCurrentScore] = useState(0);
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [totalScore1, setTotalScore1] = useState(0);
  const [totalScore2, setTotalScore2] = useState(0);
  const [p1Wins, setP1Wins] = useState(0);
  const [p2Wins, setP2Wins] = useState(0);
  const [isRollBtnDisabled, setIsRollBtnDisabled] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [resetGame, setResetGame] = useState(true);
  const [winnerMsg, setWinnerMsg] = useState("");
  const [rollFuncs, setRollFuncs] = useState([]);
  const [scoreGoal, setScoreGoal] = useState(20);

  const allStates = {
    currentDiceRoll,
    setCurrentDiceRoll,
    playerTurn,
    setPlayerTurn,
    playerCurrentScore,
    setPlayerCurrentScore,
    player1Name,
    setPlayer1Name,
    player2Name,
    setPlayer2Name,
    totalScore1,
    setTotalScore1,
    totalScore2,
    setTotalScore2,
    p1Wins,
    setP1Wins,
    p2Wins,
    setP2Wins,
    isRollBtnDisabled,
    setIsRollBtnDisabled,
    isGameOver,
    setIsGameOver,
    resetGame,
    setResetGame,
    winnerMsg,
    setWinnerMsg,
    rollFuncs,
    setRollFuncs,
    scoreGoal,
    setScoreGoal,
  };

  return (
    <diceContext.Provider value={allStates}>{children}</diceContext.Provider>
  );
}

export default ContextProvider;

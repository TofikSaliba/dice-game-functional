import React, { useEffect } from "react";
import Dice from "../Dice/Dice";
import CustomBtn from "../CustomBtn/CustomBtn";
import Player from "../Player/Player";
import ReadInput from "../ReadInput/ReadInput";
import NameInput from "../NameInput/NameInput";
import Popup from "../Popup/Popup";
import diceRollFile from "../../assets/sound/diceRoll.wav";

import "./Game.css";
import { useRollFuncs } from "../../context/ContextProvider";
import { useIsRollBtnDisabled } from "../../context/ContextProvider";
import { useCurrentDiceRoll } from "../../context/ContextProvider";
import { usePlayerCurrentScore } from "../../context/ContextProvider";
import { usePlayerTurn } from "../../context/ContextProvider";
import { useScoreGoal } from "../../context/ContextProvider";
import { usePlayer1Name } from "../../context/ContextProvider";
import { usePlayer2Name } from "../../context/ContextProvider";
import { useWinnerMsg } from "../../context/ContextProvider";
import { useTotalScore1 } from "../../context/ContextProvider";
import { useTotalScore2 } from "../../context/ContextProvider";
import { useIsGameOver } from "../../context/ContextProvider";
import { useP1Wins } from "../../context/ContextProvider";
import { useP2Wins } from "../../context/ContextProvider";
import { useResetGame } from "../../context/ContextProvider";

function Game() {
  const { rollFuncs, setRollFuncs } = useRollFuncs();
  const { isRollBtnDisabled, setIsRollBtnDisabled } = useIsRollBtnDisabled();
  const { currentDiceRoll, setCurrentDiceRoll } = useCurrentDiceRoll();
  const { playerCurrentScore, setPlayerCurrentScore } = usePlayerCurrentScore();
  const { playerTurn, setPlayerTurn } = usePlayerTurn();
  const { scoreGoal, setScoreGoal } = useScoreGoal();
  const { player1Name, setPlayer1Name } = usePlayer1Name();
  const { player2Name, setPlayer2Name } = usePlayer2Name();
  const { winnerMsg, setWinnerMsg } = useWinnerMsg();
  const { totalScore1, setTotalScore1 } = useTotalScore1();
  const { totalScore2, setTotalScore2 } = useTotalScore2();
  const { isGameOver, setIsGameOver } = useIsGameOver();
  const { p1Wins, setP1Wins } = useP1Wins();
  const { p2Wins, setP2Wins } = useP2Wins();
  const { resetGame, setResetGame } = useResetGame();

  const diceRoll = new Audio(diceRollFile);

  const rollAllDice = () => {
    setIsRollBtnDisabled(true);
    diceRoll.pause();
    diceRoll.currentTime = 0;
    diceRoll.play();
    const currentDiceRoll2 = [];
    rollFuncs.forEach((diceFunc) => {
      currentDiceRoll2.push(diceFunc());
    });
    // console.log(currentDiceRoll);
    updateCurrSumAndCurrDiceRoll(currentDiceRoll2);
  };

  const updateCurrSumAndCurrDiceRoll = (currentDiceRoll2) => {
    setCurrentDiceRoll(currentDiceRoll2);
    setTimeout(() => {
      setIsRollBtnDisabled(false);
    }, 1100);
  };

  useEffect(() => {
    setTimeout(() => {
      updateCurrentSum();
    }, 1100);
  }, [currentDiceRoll]);

  const updateCurrentSum = () => {
    const diceTotal = currentDiceRoll[0] + currentDiceRoll[1];
    if (diceTotal === 12) {
      setPlayerCurrentScore(0);
      setPlayerTurn((prev) => !prev);
    } else {
      addSumToState(diceTotal);
    }
  };

  const addSumToState = (diceSum) => {
    setPlayerCurrentScore((prev) => prev + diceSum);
    checkIfCurrentIsOverScoreGoal();
  };

  const checkIfCurrentIsOverScoreGoal = () => {
    let playerKey = playerTurn ? "2" : "1";
    checkGameOver(playerCurrentScore, playerKey);
  };

  const checkGameOver = (scoreToCheck, pNum) => {
    setTimeout(() => {
      let playerNum;
      if (scoreToCheck === scoreGoal) {
        playerNum = pNum;
        setReachScoreWinMsg(playerNum);
      } else if (scoreToCheck > scoreGoal) {
        playerNum = setPassedScoreWinMsg(pNum);
      }
      if (playerNum) {
        gameIsTrulyOverDeclareWinner(playerNum);
      }
    }, 100);
  };

  const setReachScoreWinMsg = (playerNum) => {
    let playerName = playerNum === "1" ? player1Name : player2Name;
    setWinnerMsg(
      `${playerName} has won! with reaching exactly ${scoreGoal} points.`
    );
  };

  const setPassedScoreWinMsg = (pNum) => {
    let playerNum = pNum === "1" ? "2" : "1";
    let playerName = playerNum === "1" ? player1Name : player2Name;
    setWinnerMsg(
      `${playerName} has won! by the other player elimination getting over a ${scoreGoal}`
    );
    return playerNum;
  };

  const gameIsTrulyOverDeclareWinner = (playerNum) => {
    setIsGameOver(true);
    if (playerNum === "1") {
      setP1Wins((prev) => prev + 1);
    } else {
      setP2Wins((prev) => prev + 1);
    }
  };

  const holdTheScoreAndChangeTurn = () => {
    if (playerCurrentScore === 0) return;
    const whoToAddTo = playerTurn ? "2" : "1";
    addCurrentToPlayerTotal(whoToAddTo);
    checkGameOver(whoToAddTo === "1" ? totalScore1 : totalScore2, whoToAddTo);
  };

  const addCurrentToPlayerTotal = (whoToAddTo) => {
    if (whoToAddTo === "1") {
      setTotalScore1((prev) => prev + playerCurrentScore);
    } else {
      setTotalScore2((prev) => prev + playerCurrentScore);
    }
    setPlayerTurn((prev) => !prev);
    setPlayerCurrentScore(0);
  };

  const playAgain = () => {
    setCurrentDiceRoll([0, 0]);
    setPlayerTurn(false);
    setPlayerCurrentScore(0);
    setTotalScore1(0);
    setTotalScore2(0);
    setIsRollBtnDisabled(false);
    setIsGameOver(false);
    setWinnerMsg("");
  };

  const getScoreGoalAndStart = (scoreGoal) => {
    playAgain();
    setScoreGoal(scoreGoal);
    setP1Wins(0);
    setP2Wins(0);
    setResetGame(false);
  };

  const getName = (player, value) => {
    const newVal = value ? value : `Player ${player.slice(-1)}`;
    if (player === "P1") {
      setPlayer1Name(newVal);
    } else {
      setPlayer2Name(newVal);
    }
  };

  const newGame = () => {
    setResetGame(true);
    setIsRollBtnDisabled(true);
  };

  return (
    <>
      <div className="bg-img"></div>

      <div className="mainContainer">
        <div>
          <Player
            playerName={player1Name}
            totalScore={totalScore1}
            turn={!playerTurn}
            wins={p1Wins}
          />
        </div>
        <div className="gameBoard">
          <div className="newGameBtn">
            <CustomBtn
              text="New Game"
              callBackFunc={newGame}
              disabled={isGameOver}
            />
          </div>
          <div className="diceContainer">
            <Dice rolling={isRollBtnDisabled} />
            <Dice rolling={isRollBtnDisabled} />
          </div>
          <div className="rollAndHold">
            <CustomBtn
              text="Roll The Dice"
              callBackFunc={rollAllDice}
              disabled={isRollBtnDisabled || isGameOver}
            />
            <CustomBtn
              text="Hold"
              callBackFunc={holdTheScoreAndChangeTurn}
              disabled={false}
            />
          </div>
          <div className="inputContainer">
            {resetGame && (
              <>
                <NameInput player="P1" callBack={getName} />
                <NameInput player="P2" callBack={getName} />
                <ReadInput getScoreGoal={getScoreGoalAndStart} />
              </>
            )}
            {!resetGame && (
              <div className="scoreGoal">Score Goal: {scoreGoal}</div>
            )}
          </div>
        </div>
        <div>
          <Player
            playerName={player2Name}
            totalScore={totalScore2}
            turn={playerTurn}
            wins={p2Wins}
          />
        </div>
        {isGameOver && <Popup playAgain={playAgain} winnerMsg={winnerMsg} />}
      </div>
      <div className="thanks">
        Special thanks to: Shir Toledano productions® for the amazing styling!
      </div>
    </>
  );
}

export default Game;

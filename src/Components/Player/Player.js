import "./Player.css";
import { usePlayerCurrentScore } from "../../context/ContextProvider";

const Player = (props) => {
  const { playerCurrentScore } = usePlayerCurrentScore();

  const currentPlayer = props.turn ? " current" : "";

  return (
    <div className={`playerContainer${currentPlayer}`}>
      <h1>{props.playerName}</h1>
      <div className="wins">wins: {props.wins}</div>
      <div className="totalScore">total score: {props.totalScore}</div>
      <div className="currentScore">
        Current score: {props.turn ? playerCurrentScore : 0}
      </div>
    </div>
  );
};

export default Player;

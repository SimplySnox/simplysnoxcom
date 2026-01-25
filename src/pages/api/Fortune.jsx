import "../../api.css";
import { useState } from "react";

const fortunes = [
  "You will clutch today.",
  "Your next stream will pop off.",
  "A viewer will become a regular.",
  "Tonight will be chaotic but fun.",
  "Victory comes after one fail.",
  "Chat will be chill today."
];

export default function Fortune() {
  const [fortune, setFortune] = useState(
    fortunes[Math.floor(Math.random() * fortunes.length)]
  );

  function newFortune() {
    setFortune(fortunes[Math.floor(Math.random() * fortunes.length)]);
  }

  return (
    <div className="apiPage">
      <div className="apiCard">
        <h1 className="apiTitle">Fortune</h1>

        <div className="apiText">{fortune}</div>

        <button className="apiBtn" onClick={newFortune}>
          New Fortune
        </button>

        <a className="apiBack" href="/">← Back home</a>
      </div>
    </div>
  );
}
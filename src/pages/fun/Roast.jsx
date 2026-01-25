import "../../fun.css";
import { useState } from "react";

const roasts = [
  "Your aim scares the enemies… with laughter.",
  "Even lag can’t explain that.",
  "You play like auto-jump is on forever.",
  "Minecraft mobs fear nothing — except your skills.",
  "That wasn’t strategy, that was panic.",
  "You invented new ways to lose."
];

export default function Roast() {
  const [roast, setRoast] = useState(
    roasts[Math.floor(Math.random() * roasts.length)]
  );

  function newRoast() {
    setRoast(roasts[Math.floor(Math.random() * roasts.length)]);
  }

  return (
    <div className="apiPage">
      <div className="apiCard">
        <h1 className="apiTitle">Roast</h1>

        <div className="apiText">{roast}</div>

        <button className="apiBtn" onClick={newRoast}>
          New Roast
        </button>

        <a className="apiBack" href="/">← Back home</a>
      </div>
    </div>
  );
}
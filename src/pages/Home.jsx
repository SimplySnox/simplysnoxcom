import { useEffect, useState } from "react";
import "../App.css";
import logo from "../assets/SimplySnox.jpg";

// change if needed
const TWITCH_USER = "simplysnox";

export default function Home() {
  // live: null = checking, false = offline, true = live
  const [live, setLive] = useState(null);
  const [title, setTitle] = useState("");
  const [game, setGame] = useState("");
  const [viewers, setViewers] = useState(0);

  async function checkLive() {
    try {
      const res = await fetch(
        `/.netlify/functions/twitchLive?user=${encodeURIComponent(TWITCH_USER)}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Bad response");

      const data = await res.json();

      const isLive = Boolean(data.live);
      setLive(isLive);

      setTitle(data.title || "");
      setGame(data.game || "");
      setViewers(Number(data.viewers || 0));
    } catch (err) {
      // if request fails, treat as offline (but don't crash UI)
      setLive(false);
      setTitle("");
      setGame("");
      setViewers(0);
    }
  }

  useEffect(() => {
    checkLive();

    // re-check every 60 seconds (works in background tabs; browsers may throttle)
    const id = setInterval(checkLive, 60_000);

    // when you come back to the tab, instantly refresh
    const onVis = () => {
      if (document.visibilityState === "visible") checkLive();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="page">
      <div className="card">
        {/* Avatar with subtle glow; border pulses only when LIVE */}
        <div className={`avatarWrap ${live ? "liveAvatar" : ""}`}>
          <img className="avatarImg" src={logo} alt="SimplySnox" />
        </div>

        <h1>SimplySnox</h1>

        <p className="bio">
          Variety streamer • Minecraft &amp; Among Us
          <br />
          Sometimes uploads, always vibes
        </p>

        <div className="statusRow">
          <span className={`badge ${live ? "live" : ""}`}>
            <span className="dot" />
            {live === null && "Checking status..."}
            {live === false && "Offline"}
            {live === true && `LIVE • ${viewers.toLocaleString()} watching`}
          </span>

          <a
            className="smallLink"
            href={`https://twitch.tv/${TWITCH_USER}`}
            target="_blank"
            rel="noreferrer"
          >
            Open Twitch →
          </a>
        </div>

        <div className="links">
          <a href="https://twitch.tv/simplysnox" target="_blank" rel="noreferrer">
            Twitch
          </a>

          <a href="https://youtube.com/@simplysnox" target="_blank" rel="noreferrer">
            YouTube
          </a>

          <a href="https://discord.gg/RaQwfpCry8" target="_blank" rel="noreferrer">
            Discord
          </a>

          <a href="https://x.com/simplysnox" target="_blank" rel="noreferrer">
            Twitter (X)
          </a>
        </div>

        <footer className="siteFooter">
          © 2026 SimplySnox •{" "}
          <a href="/privacy">Privacy</a> •{" "}
          <a href="/terms">Terms</a>
        </footer>
      </div>
    </div>
  );
}

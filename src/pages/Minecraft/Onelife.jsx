// src/pages/Minecraft/Onelife.jsx
import "./onelife.css";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Onelife() {
  const JAVA_HOST = "smp.simplysnox.com";
  const BEDROCK_HOST = "smp.simplysnox.com";
  const BEDROCK_PORT = "25582";
  const FRIEND_TAG = "PlayOneLife";
  const SERVER_NAME = "OneLife SMP";

  const javaAddr = JAVA_HOST;
  const bedrockAddr = `${BEDROCK_HOST}:${BEDROCK_PORT}`;

  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);

  const [status, setStatus] = useState({
    loading: true,
    ok: false,
    online: null,
    max: null,
    motd: "",
    version: "",
    error: "",
    last: null,
  });

  const bedrockLink = useMemo(() => {
    const name = encodeURIComponent(SERVER_NAME);
    const host = encodeURIComponent(BEDROCK_HOST);
    const port = encodeURIComponent(BEDROCK_PORT);
    return `minecraft://?addExternalServer=${name}|${host}:${port}`;
  }, [SERVER_NAME, BEDROCK_HOST, BEDROCK_PORT]);

  function showToast(msg, ms = 1100) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(""), ms);
  }

  async function copy(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} copied ✓`);
    } catch {
      showToast("Copy failed");
    }
  }

  function openBedrock() {
    window.location.href = bedrockLink;
    showToast("Opening Minecraft…", 1400);
  }

  function stripMotd(val) {
    if (!val) return "";
    return String(val).replace(/§[0-9A-FK-OR]/gi, "").trim();
  }

  async function fetchStatusOnce() {
    setStatus((s) => ({ ...s, loading: true, error: "" }));

    try {
      const res = await fetch(
        `https://api.mcstatus.io/v2/status/java/${encodeURIComponent(JAVA_HOST)}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const ok = !!data?.online;
      const players = data?.players || {};
      const motd =
        stripMotd(data?.motd?.clean) ||
        stripMotd(data?.motd?.raw) ||
        stripMotd(data?.motd) ||
        "";

      setStatus({
        loading: false,
        ok,
        online: Number.isFinite(players?.online) ? players.online : null,
        max: Number.isFinite(players?.max) ? players.max : null,
        motd,
        version: data?.version?.name_clean || data?.version?.name || "",
        error: "",
        last: new Date(),
      });
    } catch {
      setStatus({
        loading: false,
        ok: false,
        online: null,
        max: null,
        motd: "",
        version: "",
        error: "Status unavailable",
        last: new Date(),
      });
    }
  }

  useEffect(() => {
    fetchStatusOnce();
    const id = setInterval(fetchStatusOnce, 30_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusDotClass = useMemo(() => {
    if (status.loading) return "loading";
    return status.ok ? "on" : "off";
  }, [status.loading, status.ok]);

  const statusLine = useMemo(() => {
    if (status.loading) return "Checking status…";
    if (!status.ok) return "Offline";
    const online = status.online != null ? status.online : "?";
    const max = status.max != null ? status.max : "?";
    return `Online • ${online}/${max} players`;
  }, [status.loading, status.ok, status.online, status.max]);

  const statusMeta = useMemo(() => {
    if (status.loading) return "";
    if (status.ok && status.version) return status.version; // hide ms
    return status.error || "—";
  }, [status.loading, status.ok, status.version, status.error]);

  const desc =
    status.ok && status.motd ? status.motd : "One life. No resets. Crossplay.";

  return (
    <div className="onelifePage">
      <div className="onelifeCard">
        <div className="onelifeHeader">
          <div>
            <h1 className="onelifeTitle">
              <span className="titleGradient">{SERVER_NAME}</span>
            </h1>
            {/* <div className="onelifeSub">Hardcore • Java + Bedrock</div> */}
          </div>

          <div className="onelifeStatus" aria-live="polite">
            <div className={`statusDot ${statusDotClass}`} />
            <div className="statusText">
              <span>{statusLine}</span>
              <div className="statusMeta">{statusMeta}</div>
            </div>
          </div>
        </div>

        <p className={status.ok && status.motd ? "onelifeMotd" : "onelifeDesc"}>
          {desc}
        </p>

        <div className="onelifeGrid2">
          {/* JOIN */}
          <section className="onelifeSection">
            <h2 className="onelifeH2">Join</h2>

            <button
              className="fieldBtn"
              type="button"
              onClick={() => copy(javaAddr, "Java address")}
              title="Click to copy"
            >
              <span className="fieldLabel">Java</span>
              <code className="fieldCode">{javaAddr}</code>
              <span className="fieldHint">Click to copy</span>
            </button>

            <button
              className="fieldBtn"
              type="button"
              onClick={() => copy(bedrockAddr, "Bedrock address")}
              title="Click to copy"
            >
              <span className="fieldLabel">Bedrock</span>
              <code className="fieldCode">{bedrockAddr}</code>
              <span className="fieldHint">Click to copy</span>
            </button>

            <div className="miniActions">
              <button className="miniBtn" type="button" onClick={openBedrock}>
                Open Minecraft
              </button>
            </div>

            <div className="tinyNote">Bedrock consoles: use Friends Tab (right).</div>
          </section>

          {/* CONSOLE (FRIENDS TAB) */}
          <section className="onelifeSection onelifeFriend">
            <h2 className="onelifeH2">Console (Friends Tab)</h2>

            <button
              className="fieldBtn friendField"
              type="button"
              onClick={() => copy(FRIEND_TAG, "Gamertag")}
              title="Click to copy"
            >
              <span className="fieldLabel">Add friend</span>
              <code className="fieldCode">{FRIEND_TAG}</code>
              <span className="fieldHint">Click to copy</span>
            </button>

            <ol className="onelifeSteps">
              <li>
                Add <b>{FRIEND_TAG}</b>
              </li>
              <li>
                Minecraft → <b>Friends</b>
              </li>
              <li>
                Join <b>{SERVER_NAME}</b>
              </li>
            </ol>
          </section>
        </div>

        <div className="rulesLine">No cheating • No griefing • Be respectful</div>

        {toast ? <div className="onelifeToast">{toast}</div> : null}

        <a className="onelifeBack" href="/">
          ← Back home
        </a>
      </div>
    </div>
  );
}
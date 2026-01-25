import "../../api.css";

const STATS = {
    timesStreamed: 214,
    gamesPlayed: [
        { name: "Minecraft", count: 213 },
        { name: "Among Us", count: 24 },
        { name: "Fortnite", count: 2 },
    ],
};

export default function Stats() {
    return (
        <div className="page">
            <div className="card">
                <h1>Stats</h1>

                <p className="bio">
                    Fake stats for now (real later)
                    <br />
                    Just testing features + layout
                </p>

                <div style={{ textAlign: "left", opacity: 0.9, lineHeight: 1.6 }}>
                    <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 8 }}>
                        Streaming
                    </div>

                    <div>- Times streamed: <b>{STATS.timesStreamed}</b></div>

                    <div style={{marginTop: 6 }}>
                        {STATS.gamesPlayed.map((g) => {
                            <div key={g.name}>
                                - {g.name}: <b>{g.count}</b>
                            </div>
                        })}
                    </div>

                    <div style={{ marginTop: 14 }}>
                        <a className="smallLink" href="/api/stats">View /api/stats 👉</a>
                    </div>
                </div>

                <a className="smallLink" href="/" style={{ display: "block", marginTop: 14 }}>
                👈 Back home
                </a>
            </div>
        </div>
    );
}
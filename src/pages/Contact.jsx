import "../App.css";

export default function Contact() {
  return (
    <div className="apiPage">
      <div className="apiCard">
        <h1 className="apiTitle">Contact</h1>

        <div className="apiText" style={{ marginBottom: 12 }}>
          Best way to reach me:
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {/* Put your business email here when ready */}
          <a className="apiBtn" href="mailto:hello@simplysnox.com">Email</a>

          <a className="apiBtn" href="/discord">Discord</a>
          <a className="apiBtn" href="/x">X / Twitter</a>
          <a className="apiBtn" href="/tiktok">TikTok</a>
          <a className="apiBtn" href="/youtube">YouTube</a>
        </div>

        <div className="apiText" style={{ marginTop: 14, opacity: 0.85 }}>
          If you're reaching out for collabs or business, include what it's about + your timezone.
        </div>

        <a className="apiBack" href="/">← Back home</a>
      </div>
    </div>
  );
}
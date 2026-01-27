import "../../App.css";

export default function TipSuccess() {
  return (
    <div className="apiPage">
      <div className="apiCard">
        <h1 className="apiTitle">Thank you! ❤️</h1>
        <div className="apiText">
          Your tip went through. I seriously appreciate you.
        </div>
        <a className="apiBack" href="/">← Back home</a>
      </div>
    </div>
  );
}
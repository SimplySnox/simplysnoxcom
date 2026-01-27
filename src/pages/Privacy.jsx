import "../fun.css";

export default function Privacy() {
  return (
    <div className="apiPage">
      <div className="apiCard">
        <h1 className="apiTitle">Privacy Policy</h1>

        <div className="apiText">
          We only collect information you choose to provide (e.g. tips or contact forms).

          <br /><br />

          Payments are securely handled by services like Stripe, PayPal, and Venmo.  
          We never store payment details.

          {/* <br /><br />

          Basic analytics may be used to improve the site experience. */}

          <br /><br />

          By using this site, you agree to this policy.
        </div>

        <a className="apiBack" href="/">← Back home</a>
      </div>
    </div>
  );
}
import "../App.css";
import { useEffect, useMemo, useState } from "react";

export default function Tip() {
  const [customAmount, setCustomAmount] = useState("5");
  const [paypalOpen, setPaypalOpen] = useState(false);
  const [otherOpen, setOtherOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  const presetAmounts = useMemo(() => [3, 5, 10, 20, 50], []);

  async function startStripeCheckout(amount) {
    try {
      const dollars = Number(amount);
      if (!Number.isFinite(dollars) || dollars <= 0) {
        alert("Enter a valid amount.");
        return;
      }

      setBusy(true);

      // ✅ MUST match your function file name: /api/createCheckoutSession.js
      const res = await fetch("/api/createCheckoutSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: dollars }),
      });

      // Read raw first so we don't crash on non-JSON error responses
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(text || `Request failed (${res.status})`);
      }

      if (!res.ok) throw new Error(data?.error || "Failed to start checkout");
      if (!data?.url) throw new Error("Missing checkout URL from server");

      window.location.href = data.url;
    } catch (e) {
      alert(e.message || "Checkout failed");
    } finally {
      setBusy(false);
    }
  }

  // Load PayPal script once (only when expanded)
  useEffect(() => {
    if (!paypalOpen) return;
    if (!paypalClientId) return;

    const existing = document.getElementById("paypal-sdk");
    if (existing) return;

    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=USD`;
    script.async = true;

    script.onload = () => {
      if (!window.paypal) return;

      window.paypal
        .Buttons({
          style: { layout: "vertical" },
          createOrder: (data, actions) => {
            // PayPal uses the same custom amount box
            const value = Number(customAmount || 5).toFixed(2);
            return actions.order.create({
              purchase_units: [{ amount: { value } }],
            });
          },
          onApprove: async (data, actions) => {
            await actions.order.capture();
            alert("Thank you for the tip! ❤️");
          },
          onError: (err) => {
            console.error(err);
            alert("PayPal checkout error. Try Stripe or try again.");
          },
        })
        .render("#paypal-buttons");
    };

    document.body.appendChild(script);
  }, [paypalOpen, paypalClientId, customAmount]);

  const inputStyles = {
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(255,255,255,.06)",
    color: "white",
    width: "100%",
    outline: "none",
  };

  const rowStyles = {
    display: "flex",
    gap: 10,
    alignItems: "center",
    width: "100%",
  };

  const hrStyles = {
    height: 1,
    border: "none",
    background: "rgba(255,255,255,.10)",
    margin: "14px 0",
  };

  const sectionBtnStyles = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  };

  return (
    <div className="apiPage" style={{ padding: "26px 14px" }}>
      <div
        className="apiCard"
        style={{
          maxWidth: 560,
          width: "100%",
          padding: "22px 18px",
        }}
      >
        <h1 className="apiTitle" style={{ marginBottom: 10 }}>
          Tip
        </h1>

        <div className="apiText" style={{ marginBottom: 14 }}>
          Tips are optional — thank you for supporting the stream ❤️
          <br />
          <small style={{ opacity: 0.8 }}>Non-refundable digital support.</small>
        </div>

        <h2 style={{ margin: "10px 0 10px", fontSize: 18, opacity: 0.95 }}>
          Card / Apple Pay / Google Pay
        </h2>

        {/* Presets */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          {presetAmounts.map((amt) => (
            <button
              key={amt}
              className="apiBtn"
              onClick={() => startStripeCheckout(amt)}
              disabled={busy}
              style={{
                minWidth: 92,
                opacity: busy ? 0.7 : 1,
                cursor: busy ? "not-allowed" : "pointer",
              }}
            >
              ${amt}
            </button>
          ))}
        </div>

        {/* Custom */}
        <div style={rowStyles}>
          <input
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value.replace(/[^\d.]/g, ""))}
            placeholder="Custom (e.g. 7)"
            inputMode="decimal"
            style={inputStyles}
            disabled={busy}
          />
          <button
            className="apiBtn"
            onClick={() => startStripeCheckout(Number(customAmount || 5))}
            disabled={busy}
            style={{
              width: 110,
              opacity: busy ? 0.7 : 1,
              cursor: busy ? "not-allowed" : "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {busy ? "..." : "Tip"}
          </button>
        </div>

        <hr style={hrStyles} />

        {/* PayPal accordion */}
        <button
          className="apiBtn"
          type="button"
          onClick={() => setPaypalOpen((v) => !v)}
          style={sectionBtnStyles}
        >
          <span>PayPal</span>
          <span style={{ opacity: 0.8 }}>{paypalOpen ? "▴" : "▾"}</span>
        </button>

        {paypalOpen && (
          <div style={{ marginTop: 12 }}>
            {!paypalClientId ? (
              <div className="apiText">
                PayPal is not configured yet. Add{" "}
                <code style={{ opacity: 0.9 }}>VITE_PAYPAL_CLIENT_ID</code> to env vars.
              </div>
            ) : (
              <div id="paypal-buttons" />
            )}
          </div>
        )}

        <hr style={hrStyles} />

        {/* Other options accordion */}
        <button
          className="apiBtn"
          type="button"
          onClick={() => setOtherOpen((v) => !v)}
          style={sectionBtnStyles}
        >
          <span>Other options</span>
          <span style={{ opacity: 0.8 }}>{otherOpen ? "▴" : "▾"}</span>
        </button>

        {otherOpen && (
          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              className="apiBtn"
              href="https://venmo.com/u/simplysnox"
              target="_blank"
              rel="noreferrer"
            >
              Venmo (@simplysnox)
            </a>

            {/* Add more later if you want */}
            {/* <a className="apiBtn" href="https://streamlabs.com/YOURNAME/tip" target="_blank" rel="noreferrer">
              Streamlabs
            </a> */}
          </div>
        )}

        <a className="apiBack" href="/" style={{ marginTop: 14 }}>
          ← Back home
        </a>
      </div>
    </div>
  );
}
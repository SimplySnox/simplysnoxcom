import Stripe from "stripe";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({ error: "Missing STRIPE_SECRET_KEY" });
    }

    const stripe = new Stripe(secretKey);

    const { amount } = req.body || {};
    const dollars = Number(amount);

    // safety rails
    if (!Number.isFinite(dollars) || dollars < 1 || dollars > 100) {
      return res.status(400).json({ error: "Invalid amount (must be 1–100)" });
    }

    // ✅ auto-detect base URL (localhost in dev, domain in prod)
    const proto = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const baseUrl = `${proto}://${host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(dollars * 100),
            product_data: { name: "Tip (SimplySnox)" },
          },
        },
      ],
      success_url: `${baseUrl}/tip/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/tip`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
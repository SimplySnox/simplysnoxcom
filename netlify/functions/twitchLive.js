export async function handler(event) {
  const user = event.queryStringParameters.user;
  if (!user) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing user" }),
    };
  }

  try {
    const tokenRes = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    });

    const tokenData = await tokenRes.json();

    const streamRes = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${encodeURIComponent(user)}`,
      {
        headers: {
          "Client-ID": process.env.TWITCH_CLIENT_ID,
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const streamData = await streamRes.json();
    const stream = streamData.data?.[0];

    return {
      statusCode: 200,
      body: JSON.stringify({
        live: Boolean(stream),
        viewers: stream?.viewer_count || 0,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ live: false, viewers: 0 }),
    };
  }
}
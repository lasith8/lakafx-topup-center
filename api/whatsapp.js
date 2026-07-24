export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { phone, packageName, playerId } = req.body;

    const response = await fetch(
      `https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: phone,
          type: "text",
          text: {
            body: `🎉 LAKAFX TOP UP CENTER

Hello!

✅ We have received your order.

━━━━━━━━━━━━━━━

🎮 Package : ${packageName}

🆔 Player ID : ${playerId}

━━━━━━━━━━━━━━━

⏳ Your order is now being processed.

Thank you for choosing LAKAFX ❤️`,
          },
        }),
      }
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
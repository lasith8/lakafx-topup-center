// api/notify.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { order } = req.body;

  try {
    // WhatsApp Business API or Twilio
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    
    // Using Twilio WhatsApp
    const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(accountSid + ':' + authToken).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: 'whatsapp:+14155238886', // Twilio Sandbox number
        To: 'whatsapp:94740482490', // Admin number
        Body: `🎮 LAKAFX NEW ORDER!\n\nGame: ${order.game}\nPackage: ${order.package}\nPlayer ID: ${order.playerId}\nPhone: ${order.phone}\nStatus: ${order.status}`,
      }),
    });

    const data = await response.json();
    
    res.status(200).json({ success: true, messageId: data.sid });
  } catch (error) {
    console.error('Notification error:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
}
// src/pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ reply: 'Invalid input.' });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ reply: 'Missing API key for OpenRouter.' });
    }

    const faq: Record<string, string> = {
      "how can i work with jorge?": "For inquiries or collaboration, please leave your contact info below...",
      "what technologies do you work with?": "Jorge Vega specializes in React, Next.js, Firebase...",
    };

    const normalized = message.trim().toLowerCase();

    if (faq[normalized]) {
      await addDoc(collection(db, 'chat_sessions'), {
        sessionId: crypto.randomUUID(),
        messages: [
          { sender: 'user', text: message, timestamp: new Date() },
          { sender: 'bot', text: faq[normalized], timestamp: new Date() },
        ],
        createdAt: serverTimestamp(),
      });

      return res.status(200).json({ reply: faq[normalized] });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_CHAT_REFERER || '',
        'X-Title': process.env.NEXT_PUBLIC_CHAT_TITLE || '',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        max_tokens: 1000,
        messages: [
          {
            role: 'system',
            content: `You are the assistant of Jorge Vega...`,
          },
          {
            role: 'user',
            content: message,
          }
        ],
      }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ reply: 'OpenRouter responded with error.' });
    }

    const data = await response.json();
    const finalReply = data?.choices?.[0]?.message?.content;

    if (!finalReply) {
      return res.status(500).json({ reply: 'Assistant is currently unavailable.' });
    }
    await addDoc(collection(db, 'chat_sessions'), {
      sessionId: crypto.randomUUID(),
      messages: [
        { sender: 'user', text: message, timestamp: new Date() },
        { sender: 'bot', text: finalReply, timestamp: new Date() },
      ],
      createdAt: serverTimestamp(),
    });
    return res.status(200).json({ reply: finalReply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ reply: 'Unexpected server error.' });
  }
}

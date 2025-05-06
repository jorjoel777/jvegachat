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
      "how can i work with jorge?": "For inquiries or collaboration, please leave your contact info below and Jorge will get in touch shortly. Fill out the contact form below and Jorge will reply as soon as possible.",
      "i want to hire jorge": "Please leave your name, email, and phone so Jorge can reach out directly. Fill out the contact form below and Jorge will reply as soon as possible.",
      "how do i contact jorge directly?": "You're almost there! Fill out the contact form below and Jorge will reply as soon as possible.",
      "what services do you offer?": "Jorge Vega offers full-stack web development, modern frontends using React, backend integration with Node.js or Firebase, and API-driven solutions tailored to your business.",
      "how can i contact you?": "You can reach Jorge through the contact form or by email at jorgevegb@outlook.com.",
      "what technologies do you work with?": "Jorge Vega specializes in React, Next.js, Tailwind CSS, Firebase, Node.js, and REST/GraphQL APIs.",
      "do you work remotely?": "Yes, Jorge Vega works fully remotely with clients around the world. Communication is typically done through Zoom, Slack, or email.",
      "how long have you been in development?": "Jorge Vega has several years of experience building software solutions across industries such as education, e-commerce, and digital services.",
      "can you help me with my existing project?": "Absolutely. Jorge Vega can join ongoing projects to refactor, optimize or add new features, depending on your needs.",
      "do you offer design services?": "While Jorge Vega focuses mainly on development, he can collaborate with UI/UX designers and help bring design concepts into fully responsive, functional applications.",
      "who is jorge vega?": "Jorge Vega is a full-stack developer passionate about building impactful digital solutions. With experience across industries and technologies, he offers tailored software for business success.",
      "why did jorge vega create this page?": "This page was created by Jorge Vega to showcase his development services and provide an interactive way for potential clients to connect and learn more about his work."
    };

    const normalized = message.trim().toLowerCase();
    const matchedKey = Object.keys(faq).find((key) => normalized.includes(key));

    if (matchedKey) {
      const reply = faq[matchedKey];

      await addDoc(collection(db, 'chat_sessions'), {
        sessionId: crypto.randomUUID(),
        messages: [
          { sender: 'user', text: message, timestamp: new Date() },
          { sender: 'bot', text: reply, timestamp: new Date() },
        ],
        createdAt: serverTimestamp(),
      });

      return res.status(200).json({ reply });
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
            content: `You are the assistant of Jorge Vega. Only answer questions about his services, stack, and work. For anything else, respond: "Jorge will provide more details personally."`,
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
      return res.status(500).json({ reply: 'Assistant is currently unavailable. Please try again later.' });
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

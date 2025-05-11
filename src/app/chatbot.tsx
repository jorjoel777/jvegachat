'use client';
import { useState } from 'react';
import { saveLead } from "@/utils/saveLead";

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const predefinedQuestions = [
    "why did Jorge create this page?",
    "what technologies do you work with?",
    "How do I contact Jorge directly?",
    "I want to hire Jorge",
  ];

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, `🧍 You: ${input}`]);
    try {
      const res = await fetch(`/api/chat`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.reply || 'Unexpected error');

      setMessages(prev => [...prev, `🤖 VegaBot: ${data.reply}`]);

      const normalizedInput = input.trim().toLowerCase();
      const normalizedReply = data.reply.toLowerCase();

      const shouldShowForm =
        normalizedInput.includes("hire jorge") ||
        normalizedInput.includes("contact jorge") ||
        normalizedReply.includes("leave your contact") ||
        normalizedReply.includes("fill out the contact form") ||
        normalizedReply.includes("contact you directly");

      if (shouldShowForm) setShowForm(true);

    } catch (err: any) {
      console.error("Chat error:", err.message);
      setMessages(prev => [...prev, "❌ VegaBot is currently unavailable. Please try again later."]);
    }

    setInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await saveLead({
      nombre: formData.name,
      email: formData.email,
      telefono: formData.phone,
      mensaje: "Enviado desde el chatbot (consulta directa)"
    });

    alert('Thanks! Jorge will get in touch soon.');
    setFormData({ name: '', email: '', phone: '' });
    setShowForm(false);
  };

  return (
    <div className="w-full max-w-3xl bg-white text-black rounded-lg shadow-lg p-6">
      {/* Preguntas sugeridas */}
      <div className="mb-4 text-sm text-gray-800 space-y-2">
        <p className="font-semibold">💬 You can ask:</p>
        <div className="flex flex-wrap gap-2">
          {predefinedQuestions.map((q, idx) => (
            <button
              key={idx}
              className="mb-[8px] ml-[4px] p-[6px] py-1 bg-gray-200 rounded hover:bg-gray-600 transition text-xs"
              onClick={() => setInput(q)}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Historial de mensajes */}
      <div className="w-full max-w-[800px] p-4 sm:p-[26px] h-[400px] overflow-y-auto mb-4 border rounded-lg bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-400 italic pl-[24px] pr-[24px] pt-[8px] ">🤖 Bot responses will appear here…</p>
        ) : (
          messages.map((msg, idx) => <div key={idx} className="mb-2 pl-[24px] pr-[24px] pt-[8px]">{msg}</div>)
        )}
      </div>

      {/* Input del usuario */}
      <div className="flex gap-2">
        <input
          className="flex-1 px-4 py-2 border rounded-md p-[26px]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Please ask me a question..."
        />
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          onClick={sendMessage}
        >
          Enviar
        </button>
      </div>

      {/* Formulario de contacto */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <p className="text-sm font-semibold">📧 Leave your contact details:</p>

        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 border rounded p-[4px]"
          required
        />

        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 border rounded mt-[8px] p-[4px]"
          required
        />

        <input
          type="tel"
          placeholder="Phone (optional)"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full p-3 border rounded   mt-[8px] p-[4px] "
        />

        <div className="flex justify-end  mt-[8px] p-[4px]">
          <button
            type="submit"
            className="px-5 py-2 bg-lime-500 hover:bg-lime-600 text-black font-semibold rounded transition">
            Send
          </button>
        </div>
      </form>

      )}
    </div>
  );
}

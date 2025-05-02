import { useState } from "react";
import { saveLead } from "@/utils/saveLead";

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveLead(form);
    setEnviado(true);
    setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"></main>
<form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <h2 className="text-2xl font-bold mb-6 text-center">Contáctame</h2>

  <input
    type="text"
    name="nombre"
    placeholder="Tu nombre"
    value={form.nombre}
    onChange={handleChange}
    className="w-full mb-4 p-2 border border-gray-300 rounded"
    required
  />

  <input
    type="email"
    name="email"
    placeholder="Tu email"
    value={form.email}
    onChange={handleChange}
    className="w-full mb-4 p-2 border border-gray-300 rounded"
    required
  />

  <input
    type="tel"
    name="telefono"
    placeholder="Tu teléfono"
    value={form.telefono}
    onChange={handleChange}
    pattern="[0-9]{9,15}"
    className="w-full mb-4 p-2 border border-gray-300 rounded"
    required
  />

  <textarea
    name="mensaje"
    placeholder="¿En qué puedo ayudarte?"
    value={form.mensaje}
    onChange={handleChange}
    className="w-full mb-4 p-2 border border-gray-300 rounded"
    required
  />

  <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
    Enviar
  </button>

  {enviado && <p className="text-green-600 text-sm mt-4">¡Gracias! Tu mensaje ha sido enviado.</p>}

</form>
      </main>
    </div>
  );
}

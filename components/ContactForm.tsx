"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // No backend - just open WhatsApp
    const text = `Hi, I'm ${name}. ${message}`;
    const url = `https://wa.me/918766253356?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <input
        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none min-h-[120px]"
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-3 font-semibold"
      >
        Send on WhatsApp
      </button>
    </form>
  );
}

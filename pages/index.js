import { useEffect, useState } from "react";

export default function LandingPage() {
  const phrases = [
    "poesía", "gesto", "escritura", "voz", "palabra", "ritmo", "susurro", "fragmento", "verso", "imagen",
    "mirada", "ausencia", "latido", "deseo", "eco", "presencia", "noche", "tinta", "cuerpo", "memoria",
    "poetry", "gesture", "whisper", "body", "voice", "word", "image", "trace",
    "palavra", "corpo", "noite", "lembrança", "ausência",
    "scrittura", "desiderio", "verso", "notte", "voce",
    "言葉", "詩", "記憶", "声", "夜",
    "文字", "詩歌", "身体", "回忆", "夜晚"
  ];

  const [fallingWords, setFallingWords] = useState([]);
  const [ground, setGround] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const word = phrases[Math.floor(Math.random() * phrases.length)];
      const id = Date.now() + Math.random();
      const left = `${Math.random() * 100}%`;
      const fontSize = `${Math.random() * 10 + 12}px`;
      setFallingWords((words) => [
        ...words,
        { id, word, fontSize, top: 0, left, speed: Math.random() * 0.3 + 0.1 }
      ]);
    }, 150);

    const fallInterval = setInterval(() => {
      setFallingWords((words) => {
        return words.map((w) => {
          const maxTop = 90;
          const newTop = w.top + w.speed;
          if (newTop >= maxTop) {
            setGround((g) => [...g, { ...w, top: maxTop }]);
            return null;
          }
          return { ...w, top: newTop };
        }).filter(Boolean);
      });
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(fallInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-[#FAFAF6] text-[#1C2B24] dark:bg-[#1C2B24] dark:text-[#F9F8F4] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {[...fallingWords, ...ground].map(({ id, word, top, left, fontSize }) => (
        <span
          key={id}
          style={{
            position: "absolute",
            top: `${top}%`,
            left,
            fontSize,
            whiteSpace: "nowrap",
            fontFamily: "'Special Elite', monospace"
          }}
          className="opacity-60 hover:opacity-100 transition duration-300"
        >
          {word}
        </span>
      ))}

      <h1 className="text-5xl font-bold text-center mb-4 font-serif relative z-10">Babel</h1>

      <p className="text-center text-base max-w-md mb-6 relative z-10">
        Subí tus poemas, escribí en colaboración y participá en concursos trimestrales sin mostrar tu nombre real. Leé desde el misterio, escribí desde el gesto.
      </p>

      <div className="flex flex-col gap-3 items-center relative z-10">
        <input
          type="text"
          placeholder="Tu nombre (opcional)"
          className="w-72 px-4 py-2 border border-[#1C2B24] dark:border-[#F9F8F4] rounded text-[#1C2B24] dark:text-[#F9F8F4] placeholder-[#1C2B24] dark:placeholder-[#F9F8F4] bg-transparent"
        />
        <input
          type="email"
          placeholder="Tu email"
          className="w-72 px-4 py-2 border border-[#1C2B24] dark:border-[#F9F8F4] rounded text-[#1C2B24] dark:text-[#F9F8F4] placeholder-[#1C2B24] dark:placeholder-[#F9F8F4] bg-transparent"
        />
        <button className="w-72 px-4 py-2 mt-2 rounded border-2 border-[#1C2B24] dark:border-[#F9F8F4] bg-transparent text-[#1C2B24] dark:text-[#F9F8F4] font-bold hover:bg-[#1C2B24] hover:text-[#F9F8F4] dark:hover:bg-[#F9F8F4] dark:hover:text-[#1C2B24] transition-all duration-300 animate-pulse">
          Quiero recibir novedades
        </button>
      </div>

      <div className="mt-10 text-sm text-center text-[#1C2B24] dark:text-[#F9F8F4] opacity-80 relative z-10">
        Las palabras nos encuentran. Pronto, Babel también.
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Special+Elite&display=swap');

        .font-serif {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
    </div>
  );
}

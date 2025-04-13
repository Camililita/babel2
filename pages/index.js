import { useEffect, useState } from "react";

export default function LandingPage() {
  const phrases = [
    // Español
    "poesía", "gesto", "escritura", "voz", "palabra",
    "ritmo", "susurro", "fragmento", "verso", "imagen",
    "mirada", "ausencia", "latido", "deseo", "eco",
    "presencia", "noche", "tinta", "cuerpo", "memoria",
    // Inglés
    "poetry", "gesture", "whisper", "body", "voice",
    // Portugués
    "palavra", "corpo", "noite", "lembrança", "ausência",
    // Italiano
    "scrittura", "desiderio", "verso", "notte", "voce",
    // Japonés
    "言葉", "詩", "記憶", "声", "夜",
    // Chino
    "文字", "诗歌", "身体", "回忆", "夜晚"
  ];

  const [fallingWords, setFallingWords] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const word = phrases[Math.floor(Math.random() * phrases.length)];
      const id = Date.now() + Math.random();
      const left = `${Math.random() * 100}%`;
      const fontSize = `${Math.random() * 10 + 12}px`;
      setFallingWords((words) => [
        ...words,
        {
          id,
          word,
          fontSize,
          top: 0,
          left,
          speed: Math.random() * 0.3 + 0.1,
        }
      ]);
    }, 200);

    const fallInterval = setInterval(() => {
      setFallingWords((words) =>
        words.map((w) => {
          const newTop = w.top + w.speed;
          return {
            ...w,
            top: newTop > 85 ? 85 - Math.random() * 20 : newTop,
          };
        })
      );
    }, 60);

    return () => {
      clearInterval(interval);
      clearInterval(fallInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-[#1C2B24] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden transition-colors duration-1000 dark:bg-[#1C2B24] dark:text-[#F9F8F4]">
      {/* Palabras que caen y se acumulan */}
      {fallingWords.map(({ id, word, top, left, fontSize }) => (
        <span
          key={id}
          style={{
            position: "absolute",
            top: `${top}%`,
            left,
            fontSize,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            fontFamily: "'Special Elite', monospace",
          }}
          className="opacity-50 transition duration-300 hover:opacity-90"
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
        <button className="w-72 px-4 py-2 mt-2 rounded bg-[#1C2B24] dark:bg-[#F9F8F4] text-[#F9F8F4] dark:text-[#1C2B24] font-bold hover:scale-105 transform transition-all">
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

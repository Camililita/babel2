import { useEffect, useState } from "react";

export default function LandingPage() {
  const phrases = [
    "poesía", "gesto", "escritura", "voz", "palabra",
    "ritmo", "susurro", "fragmento", "verso", "imagen",
    "mirada", "ausencia", "latido", "deseo", "eco",
    "presencia", "noche", "tinta", "cuerpo", "memoria",
    "poetry", "gesture", "whisper", "body", "voice",
    "palavra", "corpo", "noite", "lembrança", "ausência",
    "scrittura", "desiderio", "verso", "notte", "voce",
    "言葉", "詩", "記憶", "声", "夜", "文字", "诗歌", "身体", "回忆", "夜晚"
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
    }, 250);

    const fallInterval = setInterval(() => {
      setFallingWords((words) =>
        words.map((w) => {
          const newTop = w.top + w.speed;
          const stopHeight = 80 + Math.sin(parseFloat(w.left) / 5) * 10;
          return {
            ...w,
            top: newTop >= stopHeight ? stopHeight : newTop
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
    <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-[#FAFAF6] dark:bg-[#1C1C1C] text-[#1C2B24] dark:text-[#F9F8F4] transition-colors duration-1000 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden font-sans">
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
          className="opacity-60 transition duration-300 hover:opacity-100"
        >
          {word}
        </span>
      ))}

      <h1 className="text-6xl font-bold mb-4 font-serif z-10">Babel</h1>

      <p className="text-center text-lg max-w-xl mb-6 z-10">
        Subí tus poemas, escribí en colaboración y participá en concursos trimestrales sin mostrar tu nombre real.
        Leé desde el misterio, escribí desde el gesto.
      </p>

      <div className="flex flex-col gap-3 items-center z-10">
        <input
          type="text"
          placeholder="Tu nombre (opcional)"
          className="w-72 px-4 py-2 border border-[#1C2B24] dark:border-[#F9F8F4] rounded bg-transparent placeholder-gray-500"
        />
        <input
          type="email"
          placeholder="Tu email"
          className="w-72 px-4 py-2 border border-[#1C2B24] dark:border-[#F9F8F4] rounded bg-transparent placeholder-gray-500"
        />
        <button
          className="w-72 px-4 py-2 mt-2 rounded border-2 border-[#1C2B24] dark:border-[#F9F8F4] bg-transparent font-bold transition-all duration-300 hover:bg-[#1C2B24] hover:text-[#F9F8F4] dark:hover:bg-[#F9F8F4] dark:hover:text-[#1C2B24] animate-pulse"
        >
          Quiero recibir novedades
        </button>
      </div>

      <p className="mt-10 text-sm text-center opacity-80 z-10">
        Las palabras nos encuentran. Pronto, Babel también.
      </p>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
        .font-serif {
          font-family: 'Georgia', serif;
        }
      `}</style>
    </div>
  );
}

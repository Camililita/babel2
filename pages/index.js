import { useEffect, useState } from "react";

export default function LandingPage() {
  const phrases = [
    "poesía", "gesto", "escritura", "voz", "palabra"
  ];

  const [fallingWords, setFallingWords] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const word = phrases[Math.floor(Math.random() * phrases.length)];
      const id = Date.now();
      const left = Math.random() * 90 + "%";
      const fontSize = Math.random() * 12 + 12 + "px";
      setFallingWords((words) => [
        ...words,
        { id, word, left, fontSize, top: 0 }
      ]);
    }, 400);

    const fallInterval = setInterval(() => {
      setFallingWords((words) =>
        words
          .map((w) => ({ ...w, top: w.top + 2 }))
          .filter((w) => w.top < 100)
      );
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(fallInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#E8D2A6] text-[#1F3D36] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Palabras que caen */}
      {fallingWords.map(({ id, word, left, fontSize, top }) => (
        <span
          key={id}
          style={{
            position: "absolute",
            top: `${top}%`,
            left,
            fontSize,
            color: "#1F3D36",
            opacity: 0.1,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          {word}
        </span>
      ))}

      <h1 className="text-5xl font-bold text-center mb-4 font-serif relative z-10">Babel</h1>

      <p className="italic text-center text-lg max-w-xl mb-4 font-serif relative z-10">
        "El viento no pregunta cuándo es mejor mover las hojas."
      </p>

      <p className="text-center text-base max-w-md mb-6 relative z-10">
        Subí tus poemas, escribí en colaboración y participá en concursos trimestrales sin mostrar tu nombre real. Leé desde el misterio, escribí desde el gesto.
      </p>

      <div className="flex flex-col gap-3 items-center relative z-10">
        <input
          type="text"
          placeholder="Tu nombre (opcional)"
          className="w-72 px-4 py-2 border border-[#1F3D36] rounded text-[#1F3D36] placeholder-[#1F3D36] bg-transparent"
        />
        <input
          type="email"
          placeholder="Tu email"
          className="w-72 px-4 py-2 border border-[#1F3D36] rounded text-[#1F3D36] placeholder-[#1F3D36] bg-transparent"
        />
        <button className="w-72 px-4 py-2 mt-2 rounded bg-[#1F3D36] text-[#E8D2A6] font-bold hover:bg-[#16302B]">
          Quiero recibir novedades
        </button>
      </div>

      <div className="mt-10 text-sm text-center text-[#1F3D36] opacity-80 relative z-10">
        Las palabras nos encuentran. Pronto, Babel también.
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

        .font-serif {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
    </div>
  );
}

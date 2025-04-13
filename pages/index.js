import { useEffect, useState } from "react";

export default function LandingPage() {
  const phrases = [
    "poesía", "gesto", "escritura", "voz", "palabra"
  ];

  const [fallingWords, setFallingWords] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const word = phrases[Math.floor(Math.random() * phrases.length)];
      const id = Date.now() + Math.random();
      const left = Math.random() * 90 + "%";
      const fontSize = Math.random() * 12 + 16 + "px"; // más grandes
      setFallingWords((words) => [
        ...words,
        { id, word, left, fontSize, top: 0, speed: Math.random() * 0.2 + 0.1 }
      ]);
    }, 800); // palabras un poco más espaciadas

    const fallInterval = setInterval(() => {
      setFallingWords((words) =>
        words.map((w) => {
          const newTop = w.top + w.speed;
          return { ...w, top: newTop > 90 ? 90 : newTop }; // acumulan al fondo
        })
      );
    }, 80);

    return () => {
      clearInterval(interval);
      clearInterval(fallInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-[#1C2B24] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Palabras que caen y se acumulan */}
      {fallingWords.map(({ id, word, left, fontSize, top }) => (
        <span
          key={id}
          style={{
            position: "absolute",
            top: `${top}%`,
            left,
            fontSize,
            color: "#1C2B24",
            opacity: 0.2,
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
          className="w-72 px-4 py-2 border border-[#1C2B24] rounded text-[#1C2B24] placeholder-[#1C2B24] bg-transparent"
        />
        <input
          type="email"
          placeholder="Tu email"
          className="w-72 px-4 py-2 border border-[#1C2B24] rounded text-[#1C2B24] placeholder-[#1C2B24] bg-transparent"
        />
        <button className="w-72 px-4 py-2 mt-2 rounded bg-[#1C2B24] text-[#F9F8F4] font-bold hover:bg-[#141E1A]">
          Quiero recibir novedades
        </button>
      </div>

      <div className="mt-10 text-sm text-center text-[#1C2B24] opacity-80 relative z-10">
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

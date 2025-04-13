import { useEffect, useState } from "react";

export default function LandingPage() {
  const phrases = [
    "El viento no pregunta cuándo es mejor mover las hojas."
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#E8D2A6] text-[#1F3D36] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Textura visual con fondo SVG */}
      <div className="absolute inset-0 opacity-10 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="scribble-pattern" patternUnits="userSpaceOnUse" width="200" height="200">
              <path d="M0 100 Q50 0 100 100 T200 100" fill="none" stroke="#1F3D36" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#scribble-pattern)" />
        </svg>
      </div>

      <h1 className="text-5xl font-bold text-center mb-4 font-serif relative z-10">Babel</h1>

      <p className="italic text-center text-lg max-w-xl mb-4 font-serif relative z-10">
        "{phrases[currentPhraseIndex]}"
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

import { useEffect, useRef, useState } from "react";

export default function LoginPage() {
  const containerRef = useRef(null);
  const [floatingWords, setFloatingWords] = useState([]);

  const words = ["between", "dade", "hope", "hiraeth", "流年"];

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      const word = words[Math.floor(Math.random() * words.length)];
      const left = Math.random() * (window.innerWidth - 100);
      const fontSize = 12 + Math.random() * 8;
      const speed = 0.5 + Math.random();

      setFloatingWords((prev) => [
        ...prev,
        { id, word, top: -20, left, speed, fontSize, vy: speed }
      ].slice(-50));
    }, 600);

    const fallInterval = setInterval(() => {
      setFloatingWords((prev) =>
        prev.map((w) => {
          const collisionZones = document.querySelectorAll(".collision-zone");
          let collided = false;

          collisionZones.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (
              w.left + 30 > rect.left &&
              w.left < rect.right &&
              w.top + 15 > rect.top &&
              w.top + 15 < rect.bottom
            ) {
              collided = true;
            }
          });

          return collided
            ? { ...w, vy: -w.vy * 0.6, top: w.top + w.vy }
            : { ...w, vy: Math.min(w.vy + 0.2, 3), top: w.top + w.vy };
        })
      );
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(fallInterval);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#F9F9F7] text-[#1C2B24] overflow-hidden font-mono">
      {/* Floating Words */}
      {floatingWords.map(({ id, word, top, left, fontSize }) => (
        <span
          key={id}
          style={{ top, left, fontSize }}
          className="absolute text-gray-400 opacity-70 pointer-events-none"
        >
          {word}
        </span>
      ))}

      {/* Main Login UI */}
      <div className="absolute top-1/4 w-full flex flex-col items-center gap-2 px-4">
        <h1 className="text-5xl font-serif font-bold collision-zone">Babel</h1>
        <p className="text-sm collision-zone">by Algobvio</p>

        <input
          type="text"
          placeholder="Usuario"
          className="collision-zone w-64 mt-4 p-2 border border-[#1C2B24] bg-transparent placeholder-[#1C2B24] rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="collision-zone w-64 p-2 border border-[#1C2B24] bg-transparent placeholder-[#1C2B24] rounded"
        />

        <button className="collision-zone mt-2 px-6 py-2 bg-[#1C2B24] text-white rounded hover:opacity-80 transition">
          Iniciar Sesión
        </button>
        <a href="#" className="text-sm underline mt-1">Crear cuenta</a>

        <p className="text-center text-xs mt-6 max-w-sm">
          Subí tus poemas, escribí en colaboración y participá en concursos trimestrales sin mostrar tu nombre real. Leé desde el misterio, escribí desde el gesto.
        </p>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
        body {
          font-family: 'Special Elite', monospace;
        }
      `}</style>
    </div>
  );
}

import { useEffect, useState, useRef } from "react";

export default function LandingPage() {
  const phrases = [
    "poesía", "gesto", "escritura", "voz", "palabra",
    "ritmo", "susurro", "fragmento", "verso", "imagen",
    "mirada", "ausencia", "latido", "deseo", "eco",
    "presencia", "noche", "tinta", "cuerpo", "memoria",
    "poetry", "gesture", "whisper", "body", "voice",
    "palavra", "corpo", "noite", "lembrança", "ausência",
    "scrittura", "desiderio", "notte", "voce",
    "言葉", "詩", "記憶", "声", "夜",
    "文字", "詩歌", "身体", "回忆", "夜晚"
  ];

  const [words, setWords] = useState([]);
  const frozenRefs = useRef({});
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const spawnInterval = setInterval(() => {
      const id = Date.now() + Math.random();
      const word = phrases[Math.floor(Math.random() * phrases.length)];
      const left = Math.floor(Math.random() * window.innerWidth);
      const fontSize = Math.floor(Math.random() * 10 + 14);
      const speed = Math.random() * 0.5 + 0.5;

      setWords((prev) => [
        ...prev,
        {
          id,
          word,
          top: 0,
          left,
          fontSize,
          speed,
          vy: speed,
        }
      ].slice(-100));
    }, 300);

    const fallInterval = setInterval(() => {
      setWords((prevWords) => {
        return prevWords.map((w) => {
          const elementsToCheck = [
            ...document.querySelectorAll("#babelTitle, #subtitle, input, button")
          ];

          let collided = false;
          for (let el of elementsToCheck) {
            const rect = el.getBoundingClientRect();
            if (
              w.left >= rect.left &&
              w.left <= rect.right &&
              w.top + w.fontSize >= rect.top &&
              w.top <= rect.bottom
            ) {
              collided = true;
              break;
            }
          }

          if (collided) {
            return { ...w, vy: -w.vy * 0.6, top: w.top + w.vy };
          } else {
            return { ...w, vy: w.vy + 0.2, top: w.top + w.vy };
          }
        });
      });
    }, 30);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(fallInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#fefdf8] text-[#1C2B24] flex flex-col items-center justify-center relative overflow-hidden font-lora"
    >
      {words.map(({ id, word, top, left, fontSize }) => (
        <span
          key={id}
          style={{
            position: "absolute",
            top: `${top}px`,
            left: `${left}px`,
            fontSize: `${fontSize}px`,
            fontFamily: "Lora, serif",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 1,
            opacity: 0.6
          }}
        >
          {word}
        </span>
      ))}

      <h1
        id="babelTitle"
        className="text-5xl mb-2 z-10"
        style={{ fontFamily: "'Rough Typewriter', monospace" }}
      >
        Babel
      </h1>

      <p
        id="subtitle"
        className="text-sm mb-6 max-w-sm text-center z-10"
        style={{ fontFamily: "'South Belgian Italic', serif" }}
      >
        by Algobvio
      </p>

      <input
        placeholder="Usuario"
        className="w-72 px-4 py-2 border border-[#1C2B24] rounded mb-2 bg-transparent z-10"
        style={{ fontFamily: "Lora, serif" }}
      />
      <input
        placeholder="Contraseña"
        type="password"
        className="w-72 px-4 py-2 border border-[#1C2B24] rounded mb-2 bg-transparent z-10"
        style={{ fontFamily: "Lora, serif" }}
      />
      <button
        className="w-72 px-4 py-2 border-2 border-[#1C2B24] rounded bg-transparent text-[#1C2B24] font-bold mb-2 z-10"
        style={{ fontFamily: "Lora, serif" }}
      >
        Iniciar Sesión
      </button>
      <button
        className="text-sm underline text-[#1C2B24] z-10"
        style={{ fontFamily: "Lora, serif" }}
      >
        Crear cuenta
      </button>

      <p
        className="mt-8 text-center text-xs text-[#1C2B24] max-w-xs z-10"
        style={{ fontFamily: "Lora, serif" }}
      >
        Subí tus poemas, escribí en colaboración y participá en concursos trimestrales sin mostrar tu nombre real. Leé desde el misterio, escribí desde el gesto.
      </p>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Rough+Typewriter&display=swap');
        @import url('https://fonts.cdnfonts.com/css/south-belgian');
      `}</style>
    </div>
  );
}

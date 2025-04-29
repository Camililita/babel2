import { useEffect, useRef, useState } from "react";

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
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const spawnInterval = setInterval(() => {
      const id = Date.now() + Math.random();
      const word = phrases[Math.floor(Math.random() * phrases.length)];
      const left = Math.floor(Math.random() * window.innerWidth);
      const fontSize = Math.floor(Math.random() * 10 + 14);
      const speed = Math.random() * 1 + 0.5;

      setWords((prev) => [
        ...prev,
        {
          id,
          word,
          top: 0,
          left,
          fontSize,
          speed,
          direction: 1
        }
      ].slice(-100));
    }, 150);

    const fallInterval = setInterval(() => {
      setWords((prevWords) => {
        return prevWords.map((w) => {
          const wordEl = document.getElementById(`word-${w.id}`);
          const collision = checkCollision(wordEl);
          let newDirection = w.direction;
          let newTop = w.top + w.speed * w.direction;

          if (collision && w.direction > 0) {
            newDirection = -1;
          } else if (!collision && w.direction < 0) {
            newDirection = 1;
          }

          return {
            ...w,
            top: newTop,
            direction: newDirection
          };
        });
      });
    }, 30);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(fallInterval);
    };
  }, []);

  const checkCollision = (el) => {
    if (!el) return false;
    const elRect = el.getBoundingClientRect();
    const staticEls = document.querySelectorAll(".static-zone");
    return Array.from(staticEls).some(staticEl => {
      const rect = staticEl.getBoundingClientRect();
      return elRect.bottom >= rect.top &&
             elRect.top <= rect.bottom &&
             elRect.left <= rect.right &&
             elRect.right >= rect.left;
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden bg-[#F9F9F7] text-[#1C2B24] font-lora"
    >
      {words.map(({ id, word, top, left, fontSize }) => (
        <span
          key={id}
          id={`word-${id}`}
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

      <h1 className="text-5xl static-zone text-center font-typewriter mb-2 z-10">Babel</h1>
      <h2 className="text-lg static-zone mb-6 font-italic z-10">by Algobvio</h2>

      <input
        type="text"
        placeholder="Usuario"
        className="static-zone w-72 px-4 py-2 mb-2 border border-[#1C2B24] rounded bg-transparent placeholder-[#1C2B24] text-[#1C2B24]"
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="static-zone w-72 px-4 py-2 mb-2 border border-[#1C2B24] rounded bg-transparent placeholder-[#1C2B24] text-[#1C2B24]"
      />
      <button className="static-zone w-72 px-4 py-2 mb-2 rounded border-2 border-[#1C2B24] bg-transparent text-[#1C2B24] font-bold">
        Iniciar Sesión
      </button>
      <a href="#" className="static-zone text-sm text-[#1C2B24] underline mb-6">Crear cuenta</a>

      <p className="text-center text-sm max-w-sm text-[#1C2B24] z-10 static-zone">
        Subí tus poemas, escribí en colaboración y participá en concursos trimestrales sin mostrar tu nombre real. Leé desde el misterio, escribí desde el gesto.
      </p>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');

        .font-lora {
          font-family: 'Lora', serif;
        }
        .font-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }
        .font-typewriter {
          font-family: 'Special Elite', monospace;
        }
      `}</style>
    </div>
  );
}

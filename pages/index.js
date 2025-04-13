import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const phrases = [
    "\"El viento no pregunta cuándo es mejor mover las hojas\"",
    "\"Al final, me habías respondido que sí\"",
    "\"Bailamos entre risas sabiendo que no valíamos la pena sino la gloria.\""
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#2D4842] text-[#F4F1E1] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      <h1 className="text-5xl italic font-bold text-center mb-6">Babel</h1>

      <p className="text-lg text-center max-w-xl mb-4">
        Subí tus poemas, escribí en colaboración y participá en concursos trimestrales sin mostrar tu nombre real. Leé desde el misterio, escribí desde el gesto.
      </p>

      <div className="italic text-center text-[#DAB89F] mb-8 animate-fade">
        <p className="transition-opacity duration-1000 ease-in-out">
          {phrases[currentPhraseIndex]}
        </p>
      </div>

      <Card className="w-full max-w-md bg-[#F4F1E1] shadow-lg">
        <CardContent className="flex flex-col gap-4 py-6">
          <p className="text-center font-medium text-[#3C3C3C]">
            Sumate a la comunidad de poetas.
          </p>
          <Input placeholder="Tu nombre (opcional)" className="bg-white text-black" />
          <Input placeholder="Tu email" className="bg-white text-black" />
          <Button className="bg-[#2D4842] text-white hover:bg-[#1c302c]">
            Quiero recibir novedades
          </Button>
        </CardContent>
      </Card>

      <div className="mt-10 text-sm text-center text-[#DAB89F]">
        Las palabras nos encuentran. Pronto, Babel también.
      </div>

      {/* Ilustraciones de fondo */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img src="/spiral-text.png" alt="Spiral text" className="absolute top-16 left-10 w-44 opacity-10" />
        <img src="/scribble2.png" alt="Text silhouette" className="absolute bottom-10 right-6 w-36 opacity-10 rotate-2" />
      </div>

      <style jsx>{`
        @keyframes fade {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }

        .animate-fade p {
          animation: fade 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

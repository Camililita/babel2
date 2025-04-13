import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const phrases = [
    "\"El viento no pregunta cuándo es mejor mover las hojas.\""
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#E8D2A6] text-[#1F3D36] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      <h1 className="text-5xl font-bold text-center mb-4">Babel</h1>

      <div className="italic text-center text-[#1F3D36] text-lg mb-4 animate-fade">
        <p className="transition-opacity duration-1000 ease-in-out">
          {phrases[currentPhraseIndex]}
        </p>
      </div>

      <p className="text-md text-center max-w-sm mb-6">
        Subí tus poemas, escribí en colaboración y participá en concursos trimestrales sin mostrar tu nombre real.
      </p>

      <Card className="w-full max-w-xs bg-[#F4F1E1] border border-[#1F3D36] shadow-md">
        <CardContent className="flex flex-col gap-4 py-6 px-4">
          <Input placeholder="Tu nombre (opcional)" className="bg-white text-black border border-[#1F3D36]" />
          <Input placeholder="Tu email" className="bg-white text-black border border-[#1F3D36]" />
          <Button className="bg-[#1F3D36] text-white hover:bg-[#142822]">
            Quiero recibir novedades
          </Button>
        </CardContent>
      </Card>

      <div className="mt-10 text-sm text-center text-[#1F3D36]">
        Las palabras nos encuentran. Pronto, Babel también.
      </div>

      {/* Ilustraciones de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <img src="/scribble1.png" alt="scribble" className="absolute top-0 left-0 w-40 opacity-10" />
        <img src="/scribble2.png" alt="scribble" className="absolute bottom-0 right-0 w-40 opacity-10" />
      </div>

      <style jsx>{`
        @keyframes fade {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }

        .animate-fade p {
          animation: fade 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}


import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#E9D8A6] text-[#3C3C3C] flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl italic font-bold text-center mb-4">Babel</h1>
      <p className="text-lg text-center max-w-xl mb-6">
        Una app donde la poesía se escribe entre otrxs. Subí tus poemas, escribí en colaboración y participá en concursos trimestrales sin mostrar tu nombre real. Leé desde el misterio, escribí desde el gesto.
      </p>

      <div className="italic text-center text-[#7F5539] space-y-2 mb-6 animate-[float_4s_ease-in-out_infinite]">
        <p>"El viento no pregunta cuándo es mejor mover las hojas"</p>
        <p>"Al final, me habías respondido que sí"</p>
        <p>"Bailamos entre risas sabiendo que no valíamos la pena sino la gloria."</p>
      </div>

      <Card className="w-full max-w-md bg-[#DDBEA9] shadow-md">
        <CardContent className="flex flex-col gap-4 py-6">
          <p className="text-center font-medium">
            Sumate a la comunidad de poetas.
          </p>
          <Input placeholder="Tu nombre (opcional)" className="bg-white" />
          <Input placeholder="Tu email" className="bg-white" />
          <Button className="bg-[#7F5539] text-white hover:bg-[#5c3f2c]">
            Quiero recibir novedades
          </Button>
        </CardContent>
      </Card>

      <div className="mt-10 text-sm text-center text-[#7F5539]">
        Las palabras nos encuentran. Pronto, Babel también.
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

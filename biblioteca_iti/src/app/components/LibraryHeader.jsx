
//aqui es la imagen del colegio
import { Library } from "lucide-react";

export function LibraryHeader() {
  return (
    <header className="bg-gradient-to-r from-[#2d5016] via-[#3a6b1c] to-[#2d5016] py-8 sm:py-10 px-4 shadow-2xl relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#ffd700] rounded-full -translate-x-16 -translate-y-16 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#ffd700] rounded-full translate-x-24 translate-y-24 blur-3xl"></div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-50"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          
          {/* Lado Izquierdo: Título e Info */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <div className="inline-flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full border border-white/10 mb-4 backdrop-blur-sm">
              <Library className="w-4 h-4 text-[#ffd700]" />
              <span className="text-white/90 text-xs sm:text-sm font-medium tracking-wider uppercase">
                Biblioteca Escolar
              </span>
            </div>
            
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-2xl mb-2">
              Sistema de Gestión <br className="hidden sm:block" />
              <span className="text-[#ffd700]">de Biblioteca</span>
            </h1>
            
            <p className="text-gray-200 text-lg sm:text-xl font-medium max-w-2xl">
              Instituto Técnico Industrial <span className="text-[#ffd700]">"Lucio Pabón Núñez"</span>
            </p>
          </div>

          {/* Lado Derecho: Escudo ITI */}
          <div className="relative order-1 md:order-2">
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#ffd700] to-transparent rounded-xl opacity-20 blur-lg animate-pulse"></div>
            <div className="relative w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 rounded-xl p-1 bg-gradient-to-tr from-[#ffd700] via-[#ffd700]/50 to-[#ffd700] shadow-[0_0_30px_rgba(255,215,0,0.2)]">
              <div className="w-full h-full rounded-lg bg-white overflow-hidden border-2 border-[#2d5016] shadow-inner flex items-center justify-center">
                <img 
                  src="/escudo.png" 
                  alt="Escudo Colegio Industrial de Ocaña" 
                  className="w-full h-full object-contain p-1 transform hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

//aqui es la imagen del colegio
import { Library } from "lucide-react";

export function LibraryHeader() {
  return (
    <header className="bg-gradient-to-r from-[#2d5016] via-[#3a6b1c] to-[#2d5016] py-6 sm:py-8 px-4 shadow-2xl relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent"></div>
      
      <div className="container mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative z-10">
        <div className="relative group">
          <div className="absolute -inset-2 bg-[#ffd700]/20 rounded-xl blur-lg group-hover:bg-[#ffd700]/30 transition-all duration-300"></div>
     
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
            <Library className="w-7 h-7 sm:w-8 sm:h-8 text-[#ffd700]" />
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg">
              Sistema de Gestión de Biblioteca
            </h1>
          </div>
          <p className="text-[#ffd700] text-lg sm:text-xl font-semibold drop-shadow-md">
            Colegio Industrial de Ocaña
          </p>
        </div>
      </div>
    </header>
  );
}
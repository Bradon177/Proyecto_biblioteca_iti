import { Search, Filter, BookMarked } from "lucide-react";
import { Input } from "../ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function SearchFilters({
  searchTerm,
  onSearchChange,
  areaFilter,
  onAreaChange,
  temaFilter,
  onTemaChange,
  formatFilter,
  onFormatChange,
  areas,
  temas
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8 border-2 border-[#2d5016]/10">
      
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#ffd700]/30">
        <div className="w-10 h-10 bg-gradient-to-r from-[#2d5016] to-[#3a6b1c] rounded-lg flex items-center justify-center">
          <Filter className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#2d5016]">
          Búsqueda y Filtros
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="lg:col-span-2">
          <label className="flex items-center gap-2 text-[#2d5016] mb-3 text-sm sm:text-base font-semibold">
            <BookMarked className="w-4 h-4" />
            Buscar Libro
          </label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#2d5016] w-5 h-5 transition-colors" />
            <Input
              type="text"
              placeholder="Código, nombre o autor del libro..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-12 border-2 border-[#2d5016]/30 focus:border-[#2d5016] focus:ring-2 focus:ring-[#ffd700]/30 text-sm sm:text-base rounded-lg shadow-sm transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#2d5016] mb-3 text-sm sm:text-base font-semibold">
            Área / Sección
          </label>
          <Select value={areaFilter} onValueChange={onAreaChange}>
            <SelectTrigger className="h-12 border-2 border-[#2d5016]/30 focus:border-[#2d5016] focus:ring-2 focus:ring-[#ffd700]/30 text-sm sm:text-base rounded-lg shadow-sm">
              <SelectValue placeholder="Todas las áreas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las áreas</SelectItem>
              {areas.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-[#2d5016] mb-3 text-sm sm:text-base font-semibold">
            Tema
          </label>
          <Select value={temaFilter} onValueChange={onTemaChange}>
            <SelectTrigger className="h-12 border-2 border-[#2d5016]/30 focus:border-[#2d5016] focus:ring-2 focus:ring-[#ffd700]/30 text-sm sm:text-base rounded-lg shadow-sm">
              <SelectValue placeholder="Todos los temas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los temas</SelectItem>
              {temas.map((tema) => (
                <SelectItem key={tema} value={tema}>
                  {tema}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t-2 border-gray-100">
        <label className="block text-[#2d5016] mb-4 text-sm sm:text-base font-semibold">
          Formato del Libro
        </label>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          
          <button
            onClick={() => onFormatChange("all")}
            className={`
              px-5 sm:px-6 py-3 rounded-lg transition-all duration-300 text-sm sm:text-base font-semibold
              transform hover:scale-105 shadow-md
              ${formatFilter === "all"
                ? "bg-gradient-to-r from-[#2d5016] to-[#3a6b1c] text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
            `}
          >
            Todos
          </button>

          <button
            onClick={() => onFormatChange("fisico")}
            className={`
              px-5 sm:px-6 py-3 rounded-lg transition-all duration-300 text-sm sm:text-base font-semibold
              transform hover:scale-105 shadow-md
              ${formatFilter === "fisico"
                ? "bg-gradient-to-r from-[#2d5016] to-[#3a6b1c] text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
            `}
          >
            Físico
          </button>

          <button
            onClick={() => onFormatChange("virtual")}
            className={`
              px-5 sm:px-6 py-3 rounded-lg transition-all duration-300 text-sm sm:text-base font-semibold
              transform hover:scale-105 shadow-md
              ${formatFilter === "virtual"
                ? "bg-gradient-to-r from-[#2d5016] to-[#3a6b1c] text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
            `}
          >
            Virtual (e-Book)
          </button>

        </div>
      </div>
    </div>
  );
}
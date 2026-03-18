import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "../ui/button";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) {
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white px-4 sm:px-8 py-5 rounded-xl shadow-lg border-2 border-[#2d5016]/10">
      
      <div className="flex items-center gap-3">
        <label className="text-sm font-semibold text-[#2d5016] whitespace-nowrap">
          Libros por página:
        </label>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border-2 border-[#2d5016]/30 rounded-lg px-4 py-2.5 text-sm font-semibold bg-white hover:border-[#2d5016] focus:outline-none focus:ring-2 focus:ring-[#ffd700]/50 focus:border-[#2d5016] transition-all shadow-sm"
        >
          <option value={10}>10</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        
        <Button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="border-2 border-[#2d5016]/30 hover:bg-gradient-to-r hover:from-[#2d5016] hover:to-[#3a6b1c] hover:text-white hover:border-[#2d5016] disabled:opacity-50 transition-all duration-300 shadow-sm"
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>

        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="border-2 border-[#2d5016]/30 hover:bg-gradient-to-r hover:from-[#2d5016] hover:to-[#3a6b1c] hover:text-white hover:border-[#2d5016] disabled:opacity-50 transition-all duration-300 shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline ml-1 font-semibold">Anterior</span>
        </Button>

        <div className="flex items-center gap-1.5">
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              className={
                currentPage === page
                  ? "bg-gradient-to-r from-[#2d5016] to-[#3a6b1c] text-white hover:from-[#3a6b1c] hover:to-[#2d5016] min-w-[40px] font-bold shadow-md transition-all duration-300 border-2 border-[#2d5016]"
                  : "border-2 border-[#2d5016]/30 hover:bg-gradient-to-r hover:from-[#2d5016] hover:to-[#3a6b1c] hover:text-white hover:border-[#2d5016] min-w-[40px] font-semibold transition-all duration-300 shadow-sm"
              }
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="border-2 border-[#2d5016]/30 hover:bg-gradient-to-r hover:from-[#2d5016] hover:to-[#3a6b1c] hover:text-white hover:border-[#2d5016] disabled:opacity-50 transition-all duration-300 shadow-sm"
        >
          <span className="hidden sm:inline mr-1 font-semibold">Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </Button>

        <Button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="border-2 border-[#2d5016]/30 hover:bg-gradient-to-r hover:from-[#2d5016] hover:to-[#3a6b1c] hover:text-white hover:border-[#2d5016] disabled:opacity-50 transition-all duration-300 shadow-sm"
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>

      </div>

      <div className="text-sm font-semibold text-[#2d5016] whitespace-nowrap bg-[#e8e4c0]/50 px-4 py-2 rounded-lg border-2 border-[#ffd700]/30">
        Página <span className="text-base font-bold">{currentPage}</span> de{" "}
        <span className="text-base font-bold">{totalPages}</span>
      </div>
    </div>
  );
}
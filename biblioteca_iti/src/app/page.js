"use client";
import Image from "next/image";
import { BarChart3, BookCheck, FileText, Import } from "lucide-react";
import { LibraryHeader } from "@/app/components/LibraryHeader";
import { SearchFilters } from "@/app/components/SearchFilters";
import { BookTable } from "@/app/components/BookTable";
import { Pagination } from "@/app/components/Pagination";
import { ExcelUploader } from "@/app/components/ExcelUploader";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import libraryData from "@/app/data/library.json";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [books, setBooks] = useState(libraryData.books);

  // Inicializar estados desde la URL
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [areaFilter, setAreaFilter] = useState(searchParams.get("area") || "all");
  const [temaFilter, setTemaFilter] = useState(searchParams.get("tema") || "all");
  const [formatFilter, setFormatFilter] = useState(searchParams.get("format") || "all");
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Sincronizar estado con la URL cuando cambian los filtros
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchTerm) params.set("search", searchTerm);
    else params.delete("search");
    
    if (areaFilter !== "all") params.set("area", areaFilter);
    else params.delete("area");
    
    if (temaFilter !== "all") params.set("tema", temaFilter);
    else params.delete("tema");
    
    if (formatFilter !== "all") params.set("format", formatFilter);
    else params.delete("format");
    
    if (currentPage > 1) params.set("page", currentPage.toString());
    else params.delete("page");

    const query = params.toString();
    const currentQuery = searchParams.toString();
    
    if (query !== currentQuery) {
      const url = query ? `${pathname}?${query}` : pathname;
      router.replace(url, { scroll: false });
    }
  }, [searchTerm, areaFilter, temaFilter, formatFilter, currentPage, pathname, router, searchParams]);

  // Sincronizar URL con el estado (para navegación atrás/adelante)
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const area = searchParams.get("area") || "all";
    const tema = searchParams.get("tema") || "all";
    const format = searchParams.get("format") || "all";
    const page = Number(searchParams.get("page")) || 1;

    if (search !== searchTerm) setSearchTerm(search);
    if (area !== areaFilter) setAreaFilter(area);
    if (tema !== temaFilter) setTemaFilter(tema);
    if (format !== formatFilter) setFormatFilter(format);
    if (page !== currentPage) setCurrentPage(page);
  }, [searchParams]);

  // Manejar carga de nuevos datos desde Excel
  const handleDataLoaded = (newBooks) => {
    setBooks(newBooks);
    setSearchTerm("");
    setAreaFilter("all");
    setTemaFilter("all");
    setFormatFilter("all");
    setCurrentPage(1);
  };

// Obtener listas únicas de áreas y temas
const areas = useMemo(() => {
  const uniqueAreas = [...new Set(books.map((book) => book.area))];
  return uniqueAreas.filter(area => area && area.trim() !== "").sort();
}, [books]);

const temas = useMemo(() => {
  const uniqueTemas = [...new Set(books.map((book) => book.tema))];
  return uniqueTemas.filter(tema => tema && tema.trim() !== "").sort();
}, [books]);

// Filtrar libros según los criterios de búsqueda
const filteredBooks = useMemo(() => {
  return books.filter((book) => {
    // Filtro de búsqueda general
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      searchTerm === "" ||
      String(book.codigo || "").toLowerCase().includes(searchLower) ||
      String(book.nombre || "").toLowerCase().includes(searchLower) ||
      String(book.autor || "").toLowerCase().includes(searchLower);

    // Filtro de área
    const matchesArea = areaFilter === "all" || book.area === areaFilter;

    // Filtro de tema
    const matchesTema = temaFilter === "all" || book.tema === temaFilter;

    // Filtro de formato
    let matchesFormat = true;
    if (formatFilter === "fisico") {
      matchesFormat = book.fisico;
    } else if (formatFilter === "virtual") {
      matchesFormat = book.virtual;
    }

    return matchesSearch && matchesArea && matchesTema && matchesFormat;
  });
}, [books, searchTerm, areaFilter, temaFilter, formatFilter]);

// Calcular paginación
const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
const paginatedBooks = useMemo(() => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredBooks.slice(startIndex, endIndex);
}, [filteredBooks, currentPage, itemsPerPage]);

// Resetear a la primera página cuando cambian los filtros
useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, areaFilter, temaFilter, formatFilter]);

const handlePageChange = (page) => {
  setCurrentPage(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleItemsPerPageChange = (items) => {
  setItemsPerPage(items);
  setCurrentPage(1);
};

  return (
   <div className="min-h-screen bg-gradient-to-br from-[#e8e4c0] via-[#f5f1d0] to-[#e8e4c0]">
      <LibraryHeader />

      <main className="container mx-auto px-4 py-8 sm:py-10">
        
        
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          areaFilter={areaFilter}
          onAreaChange={setAreaFilter}
          temaFilter={temaFilter}
          onTemaChange={setTemaFilter}
          formatFilter={formatFilter}
          onFormatChange={setFormatFilter}
          areas={areas}
          temas={temas}
        />

        <BookTable books={paginatedBooks} />

        {filteredBooks.length > 0 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        )}

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#2d5016]/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-r from-[#2d5016] to-[#3a6b1c] rounded-xl flex items-center justify-center shadow-lg">
                <BookCheck className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total de Libros</p>
                <p className="text-3xl font-bold text-[#2d5016]">{books.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#2d5016]/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-semibold">Formato Físico</p>
                <p className="text-3xl font-bold text-green-700">
                  {books.filter((b) => b.fisico).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#2d5016]/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-semibold">Formato Virtual</p>
                <p className="text-3xl font-bold text-blue-700">
                  {books.filter((b) => b.virtual).length}
                </p>
              </div>
            </div>
          </div>
        </div>

     
      </main>

      <footer className="bg-gradient-to-r from-[#2d5016] via-[#3a6b1c] to-[#2d5016] text-white py-6 sm:py-8 mt-16 shadow-2xl">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#ffd700] text-base sm:text-lg font-bold mb-2">
            Sistema de Gestión de Biblioteca - Colegio Industrial de Ocaña
          </p>
          <p className="text-xs sm:text-sm text-gray-300">
            Sistema de consulta estático - Marzo 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#e8e4c0]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2d5016]"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}

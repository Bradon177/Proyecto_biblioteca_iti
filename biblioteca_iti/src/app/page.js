"use client";
import Image from "next/image";
import { BarChart3, BookCheck, FileText, Import } from "lucide-react";
import { LibraryHeader } from "@/app/components/LibraryHeader";
import { SearchFilters } from "@/app/components/SearchFilters";
import { BookTable } from "@/app/components/BookTable";
import { Pagination } from "@/app/components/Pagination";
import { ExcelUploader } from "@/app/components/ExcelUploader";

import { useState, useMemo, useEffect } from "react";
import libraryData from "@/app/data/library.json";

export default function Home() {
  const [books, setBooks] = useState(libraryData.books);
  const [searchTerm, setSearchTerm] = useState("");
  const [areaFilter, setAreaFilter] = useState("all");
  const [temaFilter, setTemaFilter] = useState("all");
  const [formatFilter, setFormatFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Manejar carga de nuevos datos desde Excel
  const handleDataLoaded = (newBooks) => {
    setBooks(newBooks);
    setSearchTerm("");
    setAreaFilter("all");
    setTemaFilter("all");
    setFormatFilter("all");
    setCurrentPage(1);
    // Nota: En una app real, aquí podrías enviar los datos al backend para guardar en library.json
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
      book.codigo.toLowerCase().includes(searchLower) ||
      book.nombre.toLowerCase().includes(searchLower) ||
      book.autor.toLowerCase().includes(searchLower);

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
        <ExcelUploader onDataLoaded={handleDataLoaded} />
        
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

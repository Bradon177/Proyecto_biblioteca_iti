import { Check, X, ExternalLink, BookOpen, Package } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export function BookTable({ books }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-[#2d5016]/10">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-[#2d5016] to-[#3a6b1c] hover:from-[#2d5016] hover:to-[#3a6b1c] border-b-4 border-[#ffd700]">
              <TableHead className="text-white font-bold py-4 text-center">Código</TableHead>
              <TableHead className="text-white font-bold py-4">Nombre del Libro</TableHead>
              <TableHead className="text-white font-bold py-4">Autor(es)</TableHead>
              <TableHead className="text-white font-bold py-4 text-center">Área</TableHead>
              <TableHead className="text-white font-bold py-4 text-center">Tema</TableHead>
              <TableHead className="text-white font-bold py-4 text-center">Stand</TableHead>
              <TableHead className="text-white font-bold text-center py-4">Cantidad</TableHead>
              <TableHead className="text-white font-bold text-center py-4">Físico</TableHead>
              <TableHead className="text-white font-bold text-center py-4">Virtual</TableHead>
              <TableHead className="text-white font-bold text-center py-4">Enlace</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {books.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <BookOpen className="w-16 h-16 text-gray-300" />
                    <p className="text-gray-500 text-lg">
                      No se encontraron libros con los criterios de búsqueda
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              books.map((book, index) => (
                <TableRow
                  key={book.codigo}
                  className={`
                    hover:bg-gradient-to-r hover:from-[#e8e4c0]/50 hover:to-[#ffd700]/10
                    transition-all duration-200 border-b border-gray-100
                    ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                  `}
                >
                  <TableCell className="font-bold text-[#2d5016] py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-1 h-8 bg-[#ffd700] rounded-full"></div>
                      {book.codigo}
                    </div>
                  </TableCell>

                  <TableCell className="py-4">
                    <span className="font-medium text-gray-800">{book.nombre}</span>
                  </TableCell>

                  <TableCell className="text-gray-600 py-4">
                    {book.autor}
                  </TableCell>

                  <TableCell className="py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#ffd700]/30 to-[#ffd700]/10 text-[#2d5016] px-3 py-1.5 rounded-lg text-sm font-semibold border border-[#ffd700]/30 whitespace-nowrap">
                      <Package className="w-3.5 h-3.5" />
                      {book.area}
                    </span>
                  </TableCell>

                  <TableCell className="text-gray-700 py-4 text-center">
                    <span className="text-sm">{book.tema}</span>
                  </TableCell>

                  <TableCell className="py-4 text-center">
                    <span className="inline-block bg-[#2d5016] text-white px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap shadow-md">
                      {book.stand}
                    </span>
                  </TableCell>

                  <TableCell className="text-center py-4">
                    <span className="font-bold text-gray-800 text-base">
                      {book.cantidad}
                    </span>
                  </TableCell>

                  <TableCell className="text-center py-4">
                    {book.fisico ? (
                      <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-semibold">
                        <Check className="w-5 h-5" />
                        <span className="hidden xl:inline">Sí</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-600 px-3 py-1.5 rounded-lg font-semibold">
                        <X className="w-5 h-5" />
                        <span className="hidden xl:inline">No</span>
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="text-center py-4">
                    {book.virtual ? (
                      <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-semibold">
                        <Check className="w-5 h-5" />
                        <span className="hidden xl:inline">Sí</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-semibold">
                        <X className="w-5 h-5" />
                        <span className="hidden xl:inline">No</span>
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="text-center py-4">
                    {book.virtual && book.linkVirtual ? (
                      <a
                        href={book.linkVirtual}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2d5016] to-[#3a6b1c] text-white px-4 py-2 rounded-lg hover:from-[#3a6b1c] hover:to-[#2d5016] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-semibold text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="hidden lg:inline">Acceder</span>
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm font-medium">N/A</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {books.length > 0 && (
        <div className="bg-gradient-to-r from-[#e8e4c0] to-[#f5f1d0] px-4 sm:px-6 py-4 border-t-2 border-[#2d5016]/20">
          <p className="text-[#2d5016] text-sm sm:text-base font-semibold">
            Total de libros encontrados:{" "}
            <span className="text-lg font-bold">{books.length}</span>
          </p>
        </div>
      )}
    </div>
  );
}
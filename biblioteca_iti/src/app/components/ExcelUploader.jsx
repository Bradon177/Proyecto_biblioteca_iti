"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { Upload, FileUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

export function ExcelUploader({ onDataLoaded }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const dataBuffer = evt.target.result;
        const wb = XLSX.read(dataBuffer, { type: "array" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        console.log("Datos brutos del Excel:", data);

        // Mapear los datos del Excel a la estructura del JSON
        const mappedData = data
          .filter((row) => Object.values(row).some((val) => val !== null && val !== ""))
          .map((row) => {
            // Función para obtener valor buscando por múltiples posibles nombres de columna
            const getVal = (row, keys) => {
              const rowKeys = Object.keys(row);
              
              // Función para normalizar una cadena (quitar todo excepto letras y números)
              const normalize = (str) => {
                if (!str) return "";
                return String(str)
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "") // Quitar tildes
                  .replace(/[^a-zA-Z0-9]/g, "")    // Quitar todo lo que no sea letra o número
                  .toLowerCase();
              };

              for (const key of keys) {
                const normalizedSearchKey = normalize(key);
                
                // Buscar coincidencia normalizada
                const foundKey = rowKeys.find(rk => normalize(rk) === normalizedSearchKey);
                if (foundKey) return row[foundKey];
              }
              return "";
            };

            // Función auxiliar para detectar "SI" de forma robusta
            const isSi = (val) => {
              if (val === undefined || val === null) return false;
              const str = String(val).toUpperCase().trim();
              return str === "SI" || str === "SÍ" || val === true || val === 1 || str === "S";
            };

            return {
              codigo: String(getVal(row, ["Código del Libro", "Codigo", "ID", "Código", "Cod"])),
              nombre: String(getVal(row, ["Nombre del Libro", "Nombre", "Título", "Libro", "Nombre Libro"])),
              autor: String(getVal(row, ["Autor (es)", "Autor", "Autores", "Autor(es)"])),
              area: String(getVal(row, ["Área / Sección", "Área", "Area", "Sección", "Seccion", "Area Seccion"])),
              tema: String(getVal(row, ["Tema", "Categoría", "Categoria"])),
              stand: String(getVal(row, ["Nº Stand", "No Stand", "Stand", "Estante", "N Stand", "No. Stand"])),
              cantidad: Number(getVal(row, ["Cantidad", "Stock", "Ejemplares", "Cant"]) || 0),
              fisico: isSi(getVal(row, ["Libro en Físico?", "Libro Físico?", "Físico", "Fisico", "En Físico", "En Fisico"])),
              virtual: isSi(getVal(row, ["Libro Virtual? (e-Book)", "Libro Virtual?", "Virtual", "Digital", "E-book", "eBook"])),
              linkVirtual: String(getVal(row, ["Enalce del libro", "Enlace del libro", "Enlace", "Link", "URL", "Enalce", "Enalce Libro", "Enlace Libro"])),
            };
          });

        console.log("Datos mapeados:", mappedData);

        if (mappedData.length > 0) {
          // Guardar datos en el servidor
          const response = await fetch("/api/save-books", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(mappedData),
          });

          if (!response.ok) {
            throw new Error("No se pudieron guardar los datos en el servidor");
          }

          onDataLoaded(mappedData);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        } else {
          setError("No se encontraron datos válidos en el archivo.");
        }
      } catch (err) {
        console.error("Error al procesar el Excel:", err);
        setError(err.message || "Error al procesar el archivo Excel. Asegúrate de que las columnas coincidan.");
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError("Error al leer el archivo.");
      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-[#2d5016]/10">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-[#ffd700]/30">
        <div className="w-10 h-10 bg-gradient-to-r from-[#2d5016] to-[#3a6b1c] rounded-lg flex items-center justify-center">
          <Upload className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#2d5016]">Subir Base de Datos</h2>
          <p className="text-sm text-gray-500">Sube tu archivo Excel para actualizar el catálogo</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8 bg-gray-50/50 hover:bg-gray-50 transition-all">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="hidden"
          id="excel-upload"
          disabled={loading}
        />
        <label
          htmlFor="excel-upload"
          className="flex flex-col items-center gap-4 cursor-pointer"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100">
            <FileUp className={`w-8 h-8 ${loading ? 'animate-bounce' : 'text-[#2d5016]'}`} />
          </div>
          <div className="text-center">
            <span className="text-lg font-semibold text-[#2d5016]">
              {loading ? "Procesando..." : "Haz clic para seleccionar un archivo"}
            </span>
            <p className="text-sm text-gray-500 mt-1">Formatos permitidos: .xlsx, .xls</p>
          </div>
        </label>

        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg border border-red-100">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {success && (
          <div className="mt-4 flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg border border-green-100">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-medium">¡Datos cargados correctamente!</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
        {["Código", "Nombre", "Autor", "Área", "Tema"].map((col) => (
          <div key={col} className="text-[10px] text-center bg-[#2d5016]/5 text-[#2d5016] py-1 rounded-md font-medium">
            {col}
          </div>
        ))}
      </div>
    </div>
  );
}

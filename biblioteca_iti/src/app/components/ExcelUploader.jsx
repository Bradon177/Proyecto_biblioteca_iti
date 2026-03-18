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
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        // Mapear los datos del Excel a la estructura del JSON
        const mappedData = data.map((row) => {
          // Función auxiliar para detectar "SI" de forma robusta
          const isSi = (val) => {
            if (val === undefined || val === null) return false;
            const str = String(val).toUpperCase().trim();
            return str === "SI" || str === "SÍ" || val === true || val === 1;
          };

          return {
            codigo: String(row["Código del Libro"] || row["Codigo"] || ""),
            nombre: String(row["Nombre del Libro"] || row["Nombre"] || ""),
            autor: String(row["Autor (es)"] || row["Autor"] || ""),
            area: String(row["Área / Sección"] || row["Area"] || ""),
            tema: String(row["Tema"] || ""),
            stand: String(row["Nº Stand"] || row["No Stand"] || row["Stand"] || ""),
            cantidad: Number(row["Cantidad"] || 0),
            fisico: isSi(row["Libro en Físico?"] || row["Libro Físico?"]),
            virtual: isSi(row["Libro Virtual? (e-Book)"] || row["Libro Virtual?"]),
            linkVirtual: String(row["Enalce del libro"] || row["Enlace del libro"] || row["Enlace"] || ""),
          };
        });

        onDataLoaded(mappedData);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        console.error("Error al procesar el Excel:", err);
        setError("Error al procesar el archivo Excel. Asegúrate de que las columnas coincidan.");
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError("Error al leer el archivo.");
      setLoading(false);
    };

    reader.readAsBinaryString(file);
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

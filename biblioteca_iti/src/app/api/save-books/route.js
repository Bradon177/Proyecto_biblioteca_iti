import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Ruta absoluta al archivo library.json
    const filePath = path.join(process.cwd(), "src", "app", "data", "library.json");
    
    // Estructura que espera la aplicación
    const content = {
      books: data
    };

    // Guardar el archivo de forma asíncrona
    await writeFile(filePath, JSON.stringify(content, null, 2), "utf8");

    return NextResponse.json({ message: "Datos guardados correctamente" }, { status: 200 });
  } catch (error) {
    console.error("Error al guardar los libros:", error);
    return NextResponse.json(
      { error: "No se pudieron guardar los datos" },
      { status: 500 }
    );
  }
}

# Sistema de Gestión de Biblioteca - Colegio Industrial de Ocaña

Este proyecto es una aplicación web moderna diseñada para la consulta y gestión del catálogo de libros de la biblioteca del Colegio Industrial de Ocaña. Permite a los administradores actualizar la base de datos mediante archivos Excel y a los usuarios buscar libros de forma rápida y eficiente.

## 🚀 Funcionalidades Principales

- **Carga de Datos vía Excel**: Sube archivos `.xlsx` o `.xls` para actualizar el catálogo. El sistema cuenta con un mapeo robusto que detecta automáticamente columnas con nombres variados, saltos de línea o caracteres especiales.
- **Persistencia en JSON**: Los datos cargados se almacenan permanentemente en un archivo `library.json` en el servidor mediante una API interna.
- **Búsqueda Inteligente**: Filtra libros por código, nombre o autor en tiempo real.
- **Filtros Avanzados**: Clasifica el catálogo por Área/Sección, Tema y Formato (Físico o Virtual).
- **Acceso a E-books**: Botón directo para acceder a libros virtuales mediante enlaces externos.
- **Dashboard de Estadísticas**: Visualización rápida del total de libros, ejemplares físicos y virtuales disponibles.
- **Interfaz Responsiva**: Diseño optimizado para computadoras, tablets y dispositivos móviles.

## 🛠️ Tecnologías Utilizadas

- **Frontend**: [Next.js](https://nextjs.org/) (React) con App Router.
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) para un diseño moderno y adaptable.
- **Iconos**: [Lucide React](https://lucide.dev/).
- **Procesamiento de Excel**: [SheetJS (XLSX)](https://sheetjs.com/).
- **Componentes UI**: Basados en Radix UI para accesibilidad y calidad.

## 📈 Guía de Escalabilidad y Mejoras

Para que este proyecto siga creciendo y sea más profesional, se sugieren las siguientes líneas de mejora:

### 1. Implementación de Base de Datos Real
Actualmente, el sistema usa un archivo JSON. Para manejar miles de libros y múltiples usuarios concurrentes:
- **Sugerencia**: Migrar a **PostgreSQL** con **Prisma ORM** o **MongoDB**. Esto permitirá consultas más rápidas y seguras.

### 2. Sistema de Autenticación
Para proteger la funcionalidad de "Subir Base de Datos":
- **Sugerencia**: Implementar **NextAuth.js**. Crear un rol de "Administrador" para la carga de archivos y un rol de "Usuario" solo para consultas.

### 3. Gestión de Préstamos
Añadir una funcionalidad para registrar quién tiene un libro:
- **Sugerencia**: Crear tablas para `Usuarios` y `Préstamos`, con fechas de entrega y alertas por retraso.

### 4. Generación de Reportes
- **Sugerencia**: Añadir la capacidad de exportar el catálogo actual o las estadísticas a PDF o Excel directamente desde la interfaz.

### 5. Mejora en la Carga de Excel
- **Sugerencia**: Implementar una "Previsualización" de los datos del Excel antes de guardarlos definitivamente, permitiendo al usuario corregir errores manualmente.

## 📋 Proceso de Instalación y Uso

1. Clonar el repositorio.
2. Instalar dependencias: `npm install`.
3. Ejecutar en desarrollo: `npm run dev`.
4. Para actualizar la base de datos, usa el botón de subida en la parte superior con un archivo que contenga las columnas: Código, Nombre, Autor, Área, Tema, Stand, Cantidad, Físico, Virtual y Enlace.

---
Desarrollado para el **Colegio Industrial de Ocaña**.

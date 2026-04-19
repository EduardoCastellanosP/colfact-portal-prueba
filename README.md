# Conexus Portal - User Management Dashboard

Este proyecto es una prueba técnica para el desarrollo de un panel de administración de usuarios (Dashboard). Implementa un ciclo completo de CRUD (Crear, Leer, Actualizar, Eliminar) con persistencia simulada en el navegador, manejo avanzado de estado y validaciones estrictas.

## 🚀 Características Principales

- **Gestión de Usuarios (CRUD):** Creación, edición, eliminación y visualización de usuarios.
- **Autenticación Simulada:** Sistema de Login con protección de rutas privadas y persistencia de sesión.
- **Manejo de Estado Asíncrono:** Uso de React Query para peticiones, mutaciones y sincronización de caché en tiempo real.
- **Filtros y Paginación:** Búsqueda en tiempo real por nombre/email y filtrado por roles, junto con paginación integrada.
- **Validación de Formularios:** Esquemas estrictos de validación utilizando Zod y React Hook Form.
- **Mock API:** Integración de **Mock Service Worker (MSW)** para interceptar peticiones HTTP y simular un backend completo sin necesidad de levantar bases de datos externas.

## 🛠️ Stack Tecnológico

- **Frontend:** React 18, TypeScript, Vite.
- **Estilos:** Tailwind CSS.
- **Estado y Data Fetching:** @tanstack/react-query.
- **Formularios:** react-hook-form, @hookform/resolvers/zod, zod.
- **Enrutamiento:** react-router-dom.
- **Mocking:** MSW (Mock Service Worker).
- **UI/Notificaciones:** Sonner.

## 📦 Instrucciones de Instalación

1. Clona este repositorio o descomprime el archivo.
2. Abre una terminal en la carpeta raíz del proyecto.
3. Instala las dependencias ejecutando:
   bash
    npm install

4 Inicia el servidor de desarrollo:

  bash 
  npm run dev

5. 🔐 Credenciales de Acceso
Para ingresar al portal, utiliza las siguientes credenciales de prueba:

Usuario: admin

Contraseña: Admin123!

6. Nota
En este proyecto monolitico no es necesario levantar ningun servidor backend ya que todo se maneja por medio de MSW.

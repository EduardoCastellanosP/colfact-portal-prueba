import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../hooks/useUsers';
import { UsersTable } from '../components/UsersTable';
import { CreateUserModal } from '../components/CreateUserModal';
import type { User } from '../types/user'; // <-- 1. Importamos la interfaz User

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1); 
  
  // Nuevo estado para saber a quién estamos editando
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Si el usuario busca algo o cambia el filtro, regresamos a la página 1
  useEffect(() => {
    setPage(1);
  }, [searchTerm, roleFilter]);

  const { data: users = [], isLoading } = useUsers(searchTerm, roleFilter, page);

  // Función para abrir el modal en modo "Crear" (limpio)
  const handleOpenCreate = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  // Función para abrir el modal en modo "Editar" (con datos)
  const handleOpenEdit = (userToEdit: User) => {
    setSelectedUser(userToEdit);
    setIsModalOpen(true);
  };

  // Función para cerrar y limpiar
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-800">Conexus Portal</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Hola, <b>{user?.fullName}</b></span>
          <button onClick={logout} className="text-sm text-red-600 hover:underline">Cerrar Sesión</button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Gestión de Usuarios</h2>
          <button 
            onClick={handleOpenCreate} // <-- Usamos la nueva función aquí
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            + Nuevo Usuario
          </button>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            className="p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 border rounded-md"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">Todos los Roles</option>
            <option value="Admin">Administrador</option>
            <option value="Issuer">Emisor</option>
            <option value="IssuerViewer">Visualizador</option>
          </select>
        </div>

        {/* Tabla - Le pasamos la función de editar por props */}
        <UsersTable 
          users={users} 
          isLoading={isLoading} 
          onEdit={handleOpenEdit} // <-- Conexión con la tabla
        />

        {/* --- CONTROLES DE PAGINACIÓN --- */}
        <div className="mt-6 flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-700">
              Página <span className="font-bold">{page}</span>
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={users.length < 10} 
              className="px-4 py-2 border rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        </div>
      </main>

      <CreateUserModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        initialData={selectedUser} // <-- Conexión con el modal
      />
    </div>
  );
};
import type { User } from '../types/user';
import { useDeleteUser } from '../hooks/useUsers';
import { toast } from 'sonner';
import {useUpdateUser} from '../hooks/useUsers';


interface Props {
  users: User[];
  isLoading: boolean;
  onEdit: (user: User) => void; // Nueva prop para manejar la edición
}

export const UsersTable = ({ users, isLoading, onEdit }: Props) => {
    const {mutate: deleteUser} = useDeleteUser();
    const {mutate: updateUser} = useUpdateUser();

    const handleDelete = (id: number, name: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${name}?`)) {
      deleteUser(id, {
        onSuccess: () => toast.success('Usuario eliminado correctamente'),
        onError: () => toast.error('No se pudo eliminar al usuario')
      });
    }
  };

    


  if (isLoading) return <div className="text-center py-10">Cargando usuarios...</div>;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.fullName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.isActive ? 'Activo' : 'Inactivo'}
                </span>
              </td>
                <td className="grid px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(user.id, user.fullName)}
                      className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                    >Eliminar
                      
                    </button>


                     <td className="grid py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(user)} // <-- Usamos la función de edición pasada por props
                      className='text-white  bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded' 
                    >
                      Editar
                    </button>
                  </td>

                    
                  </td>

                 
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
              <td colSpan={4} className="px-6 py-10 text-center text-gray-500">No se encontraron usuarios.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect } from 'react';
import { toast } from 'sonner'; // Cambiado a sonner que fue el que arreglamos
import { useCreateUser, useUpdateUser } from '../hooks/useUsers';
import type { User } from '../types/user'; // Necesitamos importar la interfaz User

const userSchema = z.object({
  fullName: z.string().min(3, 'Nombre demasiado corto'),
  userName: z.string().min(3, 'Usuario obligatorio'),
  email: z.string().email('Email inválido'),
  identification: z.string().min(5, 'Identificación obligatoria'),
  role: z.enum(['Admin', 'Issuer', 'IssuerViewer']),
});

type UserFormData = z.infer<typeof userSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: User | null; // Cambiamos a User para que incluya el 'id' y 'isActive'
}

export const CreateUserModal = ({ isOpen, onClose, initialData }: Props) => {

  const isEditing = !!initialData; 
  const { mutate: create, isPending: isCreating } = useCreateUser();
  const { mutate: update, isPending: isUpdating } = useUpdateUser();
  
  const isPending = isCreating || isUpdating; 

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ fullName: '', email: '', userName: '', identification: '', role: 'Issuer' });
    }
  }, [initialData, reset, isOpen]);

  const onSubmit = (data: UserFormData) => {
    if (isEditing && initialData) {
      // Modo Edición
      update({ ...data, id: initialData.id, isActive: initialData.isActive }, {
        onSuccess: () => {
          toast.success('Usuario actualizado correctamente');
          onClose();
        }
      });
    } else {
      // Modo Creación
      create({ ...data, isActive: true }, {
        onSuccess: () => {
          toast.success('Usuario creado con éxito');
          onClose();
          reset();
        }
      });
    }
  };

  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        {/* 3. Título dinámico */}
        <h3 className="text-xl font-bold mb-4">
          {isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
        </h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input {...register('fullName')} className="w-full p-2 border rounded mt-1" />
            {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Usuario</label>
              <input {...register('userName')} className="w-full p-2 border rounded mt-1" />
              {errors.userName && <p className="text-red-500 text-xs">{errors.userName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Identificación</label>
              <input {...register('identification')} className="w-full p-2 border rounded mt-1" />
              {errors.identification && <p className="text-red-500 text-xs">{errors.identification.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input {...register('email')} className="w-full p-2 border rounded mt-1" />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Rol</label>
            <select {...register('role')} className="w-full p-2 border rounded mt-1">
              <option value="Admin">Administrador</option>
              <option value="Issuer">Emisor</option>
              <option value="IssuerViewer">Visualizador</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              {/* 4. Botón dinámico */}
              {isPending ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Usuario')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import type { User } from '../types/user';

export const useUsers = (searchTerm: string, roleFilter: string, page: number) => {
  return useQuery({
    queryKey: ['users', searchTerm, roleFilter, page],
    queryFn: async () => {
      const response = await apiClient.get<User[]>('/users', {
        params: {
            page, 
            limit: 10, // aqui puedes ajustar el límite según tus necesidades
        }
      });
      let data = response.data;

      // esto es un filtro que filtra localmente para que MSW funcione con nuestras búsquedas
      if (searchTerm) {
        data = data.filter(u => 
          u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (roleFilter) {
        data = data.filter(u => u.role === roleFilter);
      }

      return data;
    },
  });
};

//Este Hook es para crear un nuevo usuario, y que se guarde y se actualice la tabla automáticamente al crear uno nuevo. 

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUser: Omit<User, 'id'>) => {
      const response = await apiClient.post<User>('/users', newUser);
      return response.data;
    },
    onSuccess: () => {
      // Esto hace que la tabla se actualice automáticamente al crear uno nuevo
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/users/${id}`);
    },
    onSuccess: () => {
      //esto sirve para para que la tabla se refresque automáticamente
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedUser: User) => {
      const response = await apiClient.put<User>(`/users/${updatedUser.id}`, updatedUser);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

};
import { http, HttpResponse } from 'msw';
import type { AuthResponse } from '../types/auth';
import type { User } from '../types/user';

let mockUsers: User[] = [
  { id: 1, fullName: "Diana Sánchez", userName: "diana.sanchez", identification: "1098721258", email: "diana@empresa.com", role: "Issuer", isActive: true },
  { id: 2, fullName: "Carlos Gómez", userName: "carlos.gomez", identification: "900123456", email: "carlos@empresa.com", role: "IssuerViewer", isActive: false }
];

export const handlers = [
  // --- LOGIN ---
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as Record<string, string>;
    
    if (body.userName === 'admin' && body.password === 'Admin123!') {
      return HttpResponse.json<AuthResponse>({
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        refreshToken: "abc123xyz...",
        role: "Admin",
        fullName: "Administrador"
      });
    }

    return new HttpResponse(null, { status: 401, statusText: 'Unauthorized' });
  }),

  // --- para obtener los usuarios---
  http.get('/api/users', () => {
    return HttpResponse.json(mockUsers);
  }),

  // --- GUARDAR NUEVO USUARIO (El que te faltaba) ---
  http.post('/api/users', async ({ request }) => {
    const newUser = await request.json() as Omit<User, 'id'>;
    
    // Creamos el objeto final con un ID simulado
    const userWithId: User = {
      ...newUser,
      id: mockUsers.length + 1, // Con esto incrementa el ID automáticamente
      isActive: true
    };

    // Guardamos el usuario nuevo en la lista en memoria
    mockUsers.push(userWithId);

    // Y cuando se cree nos da un status 201
    return HttpResponse.json(userWithId, { status: 201 });
  }),

  // Dentro del arreglo 'handlers', agrega esto al final:

  http.delete('/api/users/:id', ({ params }) => {
    const { id } = params;
    
    // Filtramos la lista para quitar al usuario con ese ID
    mockUsers = mockUsers.filter(u => u.id !== Number(id));

    return new HttpResponse(null, { status: 204 }); // 204 significa "Éxito, sin contenido que devolver"
  }),


  http.put('/api/users/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json() as User;
    const updatedUser = { ...body, id: Number(id) };

    mockUsers = mockUsers.map(u => u.id === Number(id) ? { ...updatedUser, id: Number(id) } : u);

    return HttpResponse.json(updatedUser);
  })

];
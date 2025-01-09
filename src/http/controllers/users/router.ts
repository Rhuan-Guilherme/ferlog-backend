import { FastifyInstance } from 'fastify';
import { registerUser } from './register-user';
import { authenticateUser } from './authenticate';
import { getUser } from './get-user';
import { verifyJWT } from '@/http/middlewares/jwt-verify';
import { roleVerify } from '@/http/middlewares/role-verify';
import { getAllUser } from './get-all-users';

export async function UserRoutes(app: FastifyInstance) {
  app.post('/user/create', registerUser);
  app.post('/user/session', authenticateUser);
  app.get('/user', { onRequest: [verifyJWT] }, getUser);
  app.get('/user/all', { onRequest: [verifyJWT] }, getAllUser);
}

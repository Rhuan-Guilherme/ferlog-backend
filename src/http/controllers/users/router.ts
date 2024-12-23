import { FastifyInstance } from 'fastify';
import { registerUser } from './register-user';
import { authenticateUser } from './authenticate';
import { getUser } from './get-user';
import { createHook } from 'async_hooks';
import { verifyJWT } from '@/http/middlewares/jwt-verify';

export async function UserRoutes(app: FastifyInstance) {
  app.post('/user/create', registerUser);
  app.post('/user/session', authenticateUser);
  app.get('/user', { onRequest: [verifyJWT] }, getUser);
}

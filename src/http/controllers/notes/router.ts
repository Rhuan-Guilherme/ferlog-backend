import { verifyJWT } from '@/http/middlewares/jwt-verify';
import { FastifyInstance } from 'fastify';
import { registerNote } from './create-note';


export async function NotesRoutes(app: FastifyInstance) {
  app.post('/note/create', { onRequest: [verifyJWT]}, registerNote );
}

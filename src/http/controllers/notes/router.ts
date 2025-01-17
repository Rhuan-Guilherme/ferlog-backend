import { verifyJWT } from '@/http/middlewares/jwt-verify';
import { FastifyInstance } from 'fastify';
import { registerNote } from './create-note';
import { getNotes } from './get-notes';
import { roleVerify } from '@/http/middlewares/role-verify';
import { getNotesById } from './get-notes-by-id';
import { deleteNote } from './delete-note';
import { editNote } from './edit-notes';


export async function NotesRoutes(app: FastifyInstance) {
  app.post('/note/create', { onRequest: [verifyJWT]}, registerNote );
  app.get('/notes', { onRequest: [verifyJWT, roleVerify('ADMIN')]}, getNotes );
  app.get('/notes/:id', { onRequest: [verifyJWT]}, getNotesById );
  app.delete('/notesdelete/:id', { onRequest: [verifyJWT]}, deleteNote );
  app.put('/notes/edit', { onRequest: [verifyJWT]}, editNote );
}

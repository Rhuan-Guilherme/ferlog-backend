import { makeDeleteNote } from '@/use-cases/factoryes/delete-note';
import { makeGetNotes } from '@/use-cases/factoryes/get-notes';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function deleteNote(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const noteId = z.object({
    id: z.string().uuid()
  })

  const { id } = noteId.parse(request.params)

  try {
    const getNotes = makeDeleteNote();
    await getNotes.execute({noteId: id});
    return reply
      .status(200)
      .send({ message: 'Note deleted' });
  } catch (error) {
    console.log(error);
    
    return reply.status(500).send({
      message: 'Erro ao processar a solicitação. Tente novamente mais tarde.' + error,
    });
  }
}

import { makeGetNotes } from '@/use-cases/factoryes/get-notes';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getNotes(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getNotes = makeGetNotes();
    const notes = await getNotes.execute();
    return reply
      .status(201)
      .send({ notes: notes });
  } catch (error) {
    console.log(error);
    
    return reply.status(500).send({
      message: 'Erro ao processar a solicitação. Tente novamente mais tarde.' + error,
    });
  }
}

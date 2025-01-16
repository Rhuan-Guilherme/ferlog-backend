import { makeGetNotesById } from '@/use-cases/factoryes/get-notes-by-id';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getNotesById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const notesByIdSchema = z.object({
    id: z.string()
  })

  const { id } = notesByIdSchema.parse(request.params);

  try {
    const getNotesById = makeGetNotesById();
    const notes = await getNotesById.execute({userId: id });
    return reply
      .status(201)
      .send({ notes });
  } catch (error) {
    console.log(error);
    
    return reply.status(500).send({
      message: 'Erro ao processar a solicitação. Tente novamente mais tarde.' + error,
    });
  }
}

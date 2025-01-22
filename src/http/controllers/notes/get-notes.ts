import { makeGetNotes } from '@/use-cases/factoryes/get-notes';
import { makeGetNotesByDate } from '@/use-cases/factoryes/get-notes-by-date';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getNotes(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const dateSchema = z.object({
    dateFist: z.string().optional(),
    dateLast: z.string().optional(),
  })

  const { dateFist, dateLast } = dateSchema.parse(request.query);
  console.log(dateFist, dateLast);
  

  try {
    if(!dateLast || !dateLast){
      const getNotes = makeGetNotes();
      const notes = await getNotes.execute();
      return reply
        .status(200)
        .send({ notes });
    } else{
      const getNotesByDate = makeGetNotesByDate();
      const notes = await getNotesByDate.execute({ dateFist: dateFist ?? '', dateLast });
      return reply
        .status(200)
       .send({ notes });
    }
  } catch (error) {
    console.log(error);

    return reply.status(500).send({
      message: 'Erro ao processar a solicitação. Tente novamente mais tarde.' + error,
    });
  }
}

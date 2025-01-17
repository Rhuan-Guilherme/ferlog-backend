import { makeEditNote } from '@/use-cases/factoryes/edit-notes';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function editNote(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userSchema = z.object({
    id: z.string().uuid(),
    date: z.string().optional(),
    remetente: z.string().optional(),
    destinatario: z.string().optional(),
    n_ctrc: z.string().optional(),
    unidade: z.string().optional(),
    valor_ctrc: z.string().optional(),
  });

  const { id, date,destinatario,n_ctrc,remetente,unidade,valor_ctrc } = userSchema.parse(request.body);  

  try {
    const registerUser = makeEditNote();
    await registerUser.execute({id, date,destinatario,n_ctrc,unidade,valor_ctrc,remetente});
    return reply
      .status(200)
      .send({ message: 'Edição realizado com sucesso.' });
  } catch (error) {
    console.log(error);
    
    return reply.status(500).send({
      message: 'Erro ao processar a solicitação. Tente novamente mais tarde.' + error,
    });
  }
}

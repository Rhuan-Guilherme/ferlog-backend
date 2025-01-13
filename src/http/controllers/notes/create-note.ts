import { makeCreateNote } from '@/use-cases/factoryes/create-note';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function registerNote(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userSchema = z.object({
    date: z.string(),
    remetente: z.string(),
    destinatario: z.string(),
    n_ctrc: z.string(),
    unidade: z.string(),
    valor_ctrc: z.string(),
  });

  const { date,destinatario,n_ctrc,remetente,unidade,valor_ctrc } = userSchema.parse(request.body);  
  console.log(date, destinatario, n_ctrc, unidade, valor_ctrc);
  

  try {
    const registerUser = makeCreateNote();
    await registerUser.execute({ date,destinatario,n_ctrc,unidade,valor_ctrc,remetente, userId: request.user.sub });
    return reply
      .status(201)
      .send({ message: 'Cadastro realizado com sucesso.' });
  } catch (error) {
    console.log(error);
    
    return reply.status(500).send({
      message: 'Erro ao processar a solicitação. Tente novamente mais tarde.' + error,
    });
  }
}

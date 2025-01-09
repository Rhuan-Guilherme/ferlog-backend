import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { makeRegisterUser } from '@/use-cases/factoryes/register-user';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(2),
    cargo: z.string().optional(),
    phone: z.string().optional(),
  });

  const { email, name, password, cargo, phone  } = userSchema.parse(request.body);  

  try {
    const registerUser = makeRegisterUser();
    await registerUser.execute({ email, name, password, cargo, phone });
    return reply
      .status(201)
      .send({ message: 'Cadastro realizado com sucesso.' });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      reply
        .status(409)
        .send({ message: 'Já exisite um cadastro com esse e-mail.' });
    }

    return reply.status(500).send({
      message: 'Erro ao processar a solicitação. Tente novamente mais tarde.',
    });
  }
}

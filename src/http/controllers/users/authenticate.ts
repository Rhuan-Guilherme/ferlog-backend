import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-errors';
import { makeAuthenticateUser } from '@/use-cases/factoryes/authenticate';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = authenticateSchema.parse(request.body);

  try {
    const registerUser = makeAuthenticateUser();
    const { user } = await registerUser.execute({ email, password });

    const token = await reply.jwtSign({ role: user.role }, { sub: user.id });

    return reply.status(201).send({ token: token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: error.message });
    }

    return reply.status(500).send({
      message: 'Erro ao processar a solicitação. Tente novamente mais tarde.',
    });
  }
}

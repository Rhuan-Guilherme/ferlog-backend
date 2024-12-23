import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-errors';
import { makeGetUser } from '@/use-cases/factoryes/get-user';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const registerUser = makeGetUser();
    const { user } = await registerUser.execute({ id: request.user.sub });

    return reply.status(201).send({ ...user, password_hash: undefined });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message });
    }

    return reply.status(500).send({
      message: 'Erro ao processar a solicitação. Tente novamente mais tarde.',
    });
  }
}

import { makeGetAllUsers } from '@/use-cases/factoryes/get-all-users';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getAllUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const registerUser = makeGetAllUsers();
    const { user } = await registerUser.execute();

    return reply.status(200).send({ user });
  } catch (error) {
      return reply.status(401).send({ message: error });
  }
}

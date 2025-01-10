import { MakeDeleteUser } from '@/use-cases/factoryes/delete-user';
import { makeGetAllUsers } from '@/use-cases/factoryes/get-all-users';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function DeleteUser(request: FastifyRequest, reply: FastifyReply) {
  const requestId = z.object({
    id: z.string().uuid()
  })

  const { id } = requestId.parse(request.params);

  try {
    const registerUser = MakeDeleteUser();
    const { user } = await registerUser.execute({
      id
    });

    return reply.status(200).send({ user });
  } catch (error) {
      return reply.status(500).send({ message: error });
  }
}

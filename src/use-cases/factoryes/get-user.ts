import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { GetUseerUseCase } from '../get-user';

export function makeGetUser() {
  const userRepository = new PrismaUserRepository();
  const getUserUseCase = new GetUseerUseCase(userRepository);

  return getUserUseCase;
}

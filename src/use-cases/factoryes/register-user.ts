import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { RegisterUserUseCase } from '../register-user';

export function makeRegisterUser() {
  const userRepository = new PrismaUserRepository();
  const registerUseCase = new RegisterUserUseCase(userRepository);

  return registerUseCase;
}

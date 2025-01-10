import { User } from '@prisma/client';
import { UserRpositotyInterface } from '@/repositories/user-repository-interface';
import { compare } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-errors';

interface DeleteUserRequest {
  id: string;
}

interface DeleteUserResponse {
  user: User;
}

export class DeleteUserUseCase {
  constructor(private userRepository: UserRpositotyInterface) {}

  async execute({ id }: DeleteUserRequest): Promise<DeleteUserResponse> {
    const user = await this.userRepository.deleteUser(id);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}

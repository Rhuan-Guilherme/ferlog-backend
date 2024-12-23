import { User } from '@prisma/client';
import { UserRpositotyInterface } from '@/repositories/user-repository-interface';
import { compare } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-errors';

interface GetUseerRequest {
  id: string;
}

interface GetUseerResponse {
  user: User;
}

export class GetUseerUseCase {
  constructor(private userRepository: UserRpositotyInterface) {}

  async execute({ id }: GetUseerRequest): Promise<GetUseerResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}

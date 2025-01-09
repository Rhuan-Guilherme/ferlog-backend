import { User } from '@prisma/client';
import { UserRpositotyInterface } from '@/repositories/user-repository-interface';
import { InvalidCredentialsError } from './errors/invalid-credentials-errors';


interface GetUseerResponse {
  user: User[];
}

export class GetAllUserUseCase {
  constructor(private userRepository: UserRpositotyInterface) {}

  async execute(): Promise<GetUseerResponse> {
    const user = await this.userRepository.allUsers()

    if (!user) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}

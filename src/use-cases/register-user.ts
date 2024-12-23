import { User } from '@prisma/client';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { UserRpositotyInterface } from '@/repositories/user-repository-interface';
import { hash } from 'bcryptjs';

interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserResponse {
  user: User;
}

export class RegisterUserUseCase {
  constructor(private userRepository: UserRpositotyInterface) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUserRequest): Promise<RegisterUserResponse> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const user = await this.userRepository.create({
      email,
      name,
      password_hash: passwordHash,
    });

    return {
      user,
    };
  }
}

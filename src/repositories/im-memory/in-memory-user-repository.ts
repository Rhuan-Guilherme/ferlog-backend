import { Prisma, User } from '@prisma/client';
import { UserRpositotyInterface } from '../user-repository-interface';
import { randomUUID } from 'crypto';

export class InMomoryUserRepository implements UserRpositotyInterface {
  user: User[] = [];
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const newUser = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
    };

    this.user.push(newUser);

    return newUser;
  }
  async findById(id: string): Promise<User | null> {
    const user = this.user.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = this.user.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}

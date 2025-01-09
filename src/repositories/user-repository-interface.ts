import { Prisma, User } from '@prisma/client';

export interface UserRpositotyInterface {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  allUsers(): Promise<User[]>;
}

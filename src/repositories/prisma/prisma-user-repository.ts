import { Prisma, User } from '@prisma/client';
import { UserRpositotyInterface } from '../user-repository-interface';
import { prisma } from '@/lib/prisma';

export class PrismaUserRepository implements UserRpositotyInterface {
  create(data: Prisma.UserCreateInput): Promise<User> {
    const user = prisma.user.create({ data });

    return user;
  }
  findById(id: string): Promise<User | null> {
    const user = prisma.user.findUnique({ where: { id } });

    return user;
  }
  findByEmail(email: string): Promise<User | null> {
    const user = prisma.user.findUnique({ where: { email } });

    return user;
  }
}

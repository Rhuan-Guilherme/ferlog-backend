import { Prisma, User } from '@prisma/client';
import { UserRpositotyInterface } from '../user-repository-interface';
import { prisma } from '@/lib/prisma';

export class PrismaUserRepository implements UserRpositotyInterface {
  
 
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });

    return user;
  }
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }

   async allUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({ where: {role: 'MEMBER'}})

    return users;
  }

  
  async deleteUser(id: string): Promise<User | null> {
    const user = await prisma.user.delete({ where: { id } });

    return user;
  }
}

import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { DeleteUserUseCase } from "../delete-user";

export function MakeDeleteUser(){
  const userRepository = new PrismaUserRepository
  const deleteUser = new DeleteUserUseCase(userRepository)

  return deleteUser
}
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetAllUserUseCase } from "../get-all-users";

export function makeGetAllUsers(){
  const userRepository = new PrismaUserRepository()
  const getAllUsers = new GetAllUserUseCase(userRepository)

  return getAllUsers
}
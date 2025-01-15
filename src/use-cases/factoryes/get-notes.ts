import { GetNotesUseCase } from "../get-notes";
import { PrismaNotesRepository } from "@/repositories/prisma/prisma-notes-repository";

export function makeGetNotes(){
  const notesRepository = new PrismaNotesRepository()
  const getNotesUseCase = new GetNotesUseCase(notesRepository)

  return getNotesUseCase
}
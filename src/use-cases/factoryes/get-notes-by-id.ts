import { PrismaNotesRepository } from "@/repositories/prisma/prisma-notes-repository";
import { GetNotesByIdUseCase } from "../get-notes-by-id";

export function makeGetNotesById(){
  const notesRepository = new PrismaNotesRepository()
  const getNotesByUseCase = new GetNotesByIdUseCase(notesRepository)

  return getNotesByUseCase
}
import { PrismaNotesRepository } from "@/repositories/prisma/prisma-notes-repository";
import { GetNotesByDateUseCase } from "../get-notes-by-date";

export function makeGetNotesByDate(){
  const notesRepository = new PrismaNotesRepository()
  const getNotesByDate = new GetNotesByDateUseCase(notesRepository)

  return getNotesByDate
}
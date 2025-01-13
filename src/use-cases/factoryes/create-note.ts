import { PrismaNotesRepository } from "@/repositories/prisma/prisma-notes-repository";
import { CreateNoteUseCase } from "../create-note";

export function makeCreateNote(){
  const noteRepository = new PrismaNotesRepository
  const createNote = new CreateNoteUseCase(noteRepository)

  return createNote
}
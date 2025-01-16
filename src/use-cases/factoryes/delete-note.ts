import { PrismaNotesRepository } from "@/repositories/prisma/prisma-notes-repository";
import { DeleteNoteUseCase } from "../delete-note";

export function makeDeleteNote(){
  const noteRepository = new PrismaNotesRepository
  const createNote = new DeleteNoteUseCase(noteRepository)

  return createNote
}
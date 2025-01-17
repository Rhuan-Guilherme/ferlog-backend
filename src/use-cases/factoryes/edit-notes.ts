import { PrismaNotesRepository } from "@/repositories/prisma/prisma-notes-repository";
import { EditNoteUseCase } from "../edit-notes";

export function makeEditNote(){
  const noteRepository = new PrismaNotesRepository
  const editNote = new EditNoteUseCase(noteRepository)

  return editNote
}
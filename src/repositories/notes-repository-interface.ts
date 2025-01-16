import { Notes, Prisma } from "@prisma/client";

export interface NotesRepositoryInterface{
  createNote(data: Prisma.NotesCreateInput): Promise<Notes>;
  getNotes(): Promise<Notes[] | null>;
  getNotesById(userId: string): Promise<Notes[] | null>;
  delete(noteId: string): Promise<Notes | null>;
}
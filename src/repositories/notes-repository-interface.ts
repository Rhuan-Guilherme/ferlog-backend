import { Notes, Prisma } from "@prisma/client";

export interface NotesRepositoryInterface{
  createNote(data: Prisma.NotesCreateInput): Promise<Notes>;
  getNotes(): Promise<Notes[] | null>;
  getNotesById(userId: string): Promise<Notes[] | null>;
  getNotesByDate(dateFist: string, dateLast: string): Promise<Notes[] | null>;
  delete(noteId: string): Promise<Notes | null>;
  edit(data: Prisma.NotesUpdateInput, noteId: string): Promise<Notes | null>;
}
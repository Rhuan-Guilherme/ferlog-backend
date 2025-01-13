import { Notes, Prisma } from "@prisma/client";

export interface NotesRepositoryInterface{
  createNote(data: Prisma.NotesCreateInput): Promise<Notes>;
}
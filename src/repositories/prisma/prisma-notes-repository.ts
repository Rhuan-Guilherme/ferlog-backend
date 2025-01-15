import { Prisma, Notes } from "@prisma/client";
import { NotesRepositoryInterface } from "../notes-repository-interface";
import { prisma } from "@/lib/prisma";

export class PrismaNotesRepository implements NotesRepositoryInterface{
  
  
  async createNote(data: Prisma.NotesCreateInput): Promise<Notes> {
    const note = await prisma.notes.create({
      data
    })

    return note
  }

  async getNotes(): Promise<Notes[] | null> {
    const notes = await prisma.notes.findMany()

    if(!notes){
      return null
    }

    return notes
  }

  async getNotesById(userId: string): Promise<Notes[] | null> {
    const notes = await prisma.notes.findMany({where: {
        userId
      } 
    })

    if(!notes){
      return null
    }

    return notes
  }
  
}
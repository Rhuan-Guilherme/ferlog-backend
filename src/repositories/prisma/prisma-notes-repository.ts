import { Prisma, Notes } from "@prisma/client";
import { NotesRepositoryInterface } from "../notes-repository-interface";
import { prisma } from "@/lib/prisma";

export class PrismaNotesRepository implements NotesRepositoryInterface{
  async getNotesByDate(dateFist: string, dateLast: string): Promise<Notes[] | null> {
    const notes = await prisma.notes.findMany({
      where: {
        created_at: {
          gte: new Date(dateFist),
          lte: new Date(dateLast)
        },
      },
      orderBy: {
        created_at: "desc"
      },
      include: {
        user: true
      }
    })

    if(!notes ||!notes.length){
      return null
    }

    return notes
  }
 
  
  
  async createNote(data: Prisma.NotesCreateInput): Promise<Notes> {
    const note = await prisma.notes.create({
      data
    })

    return note
  }

  async getNotes(): Promise<Notes[] | null> {
    const notes = await prisma.notes.findMany({
      orderBy: {
        created_at: "desc"
      },
      include: {
        user: true
      }
    })

    if(!notes || !notes.length){
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

  
  async delete(noteId: string): Promise<Notes | null> {
    const note = await prisma.notes.delete({ where: { id: noteId } });

    if(!note){
      return null
    }

    return note
  }

   async edit(data: Prisma.NotesCreateInput, noteId: string): Promise<Notes | null> {
    const note = await prisma.notes.update({data, where: {id: noteId}})

    return note
  }
  
}
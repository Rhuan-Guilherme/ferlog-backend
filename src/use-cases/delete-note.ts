import { NotesRepositoryInterface } from "@/repositories/notes-repository-interface";
import { Notes } from "@prisma/client";

interface DeleteNoteRequest{
  noteId: string
}

interface DeleteNoteResponse{
  note: Notes
}


export class DeleteNoteUseCase{
  constructor(private noteRepository: NotesRepositoryInterface){}

   async execute({noteId}: DeleteNoteRequest): Promise<DeleteNoteResponse>{
    const note = await this.noteRepository.delete(noteId)

    if(!note){
      throw new Error('Could not delete note');
    }

    return {
      note
    }
    
  }

}
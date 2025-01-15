import { NotesRepositoryInterface } from "@/repositories/notes-repository-interface";
import { Notes } from "@prisma/client";

interface GetNotesResponse{
  notes: Notes[]
}

export class GetNotesUseCase{
  constructor(private noteRepository: NotesRepositoryInterface){}

   async execute(): Promise<GetNotesResponse>{
    const notes = await this.noteRepository.getNotes()

    if(!notes){
      throw new Error('Could not create note');
    }

    return {
      notes
    }
    
  }

}
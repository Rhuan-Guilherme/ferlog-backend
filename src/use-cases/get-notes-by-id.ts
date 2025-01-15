import { NotesRepositoryInterface } from "@/repositories/notes-repository-interface";
import { Notes } from "@prisma/client";

interface GetNotesByIdRequest{
  userId: string
}

interface GetNotesByIdResponse{
  notes: Notes[]
}

export class GetNotesByIdUseCase{
  constructor(private noteRepository: NotesRepositoryInterface){}

   async execute({userId}: GetNotesByIdRequest): Promise<GetNotesByIdResponse>{
    const notes = await this.noteRepository.getNotesById(userId)

    if(!notes){
      throw new Error('Could not create note');
    }

    return {
      notes
    }
    
  }

}
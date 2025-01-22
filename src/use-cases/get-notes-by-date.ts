import { NotesRepositoryInterface } from "@/repositories/notes-repository-interface";
import { Notes } from "@prisma/client";

interface GetNotesByDateRequest{
  dateFist: string
  dateLast: string
}

interface GetNotesByDateResponse{
  notes: Notes[]
}

export class GetNotesByDateUseCase{
  constructor(private noteRepository: NotesRepositoryInterface){}

   async execute({dateFist,dateLast}: GetNotesByDateRequest): Promise<GetNotesByDateResponse>{
    const notes = await this.noteRepository.getNotesByDate(dateFist,dateLast)

    if(!notes){
      throw new Error('Not noutes found!');
    }

    return {
      notes
    }
    
  }

}
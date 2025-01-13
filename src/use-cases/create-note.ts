import { NotesRepositoryInterface } from "@/repositories/notes-repository-interface";
import { Notes } from "@prisma/client";

interface CreateNoteRequest{
    date: string;
    remetente: string;
    destinatario: string;
    n_ctrc: string;
    unidade: string;
    valor_ctrc: string;
    userId: string;
}

interface CreateNoteResponse{
  note: Notes
}


export class CreateNoteUseCase{
  constructor(private noteRepository: NotesRepositoryInterface){}

   async execute({date,destinatario,n_ctrc,remetente,unidade,userId,valor_ctrc}: CreateNoteRequest): Promise<CreateNoteResponse>{
    const note = await this.noteRepository.createNote({date,destinatario,n_ctrc,remetente,unidade,user: {connect: {id: userId}},valor_ctrc})

    if(!note){
      throw new Error('Could not create note');
    }

    return {
      note
    }
    
  }

}
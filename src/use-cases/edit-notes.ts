import { NotesRepositoryInterface } from "@/repositories/notes-repository-interface";
import { Notes } from "@prisma/client";

interface EditNoteRequest{
    id: string;
    date: string | undefined;
    remetente: string | undefined;
    destinatario: string | undefined;
    n_ctrc: string | undefined;
    unidade: string | undefined;
    valor_ctrc: string | undefined;
}

interface EditNoteResponse{
  note: Notes
}


export class EditNoteUseCase{
  constructor(private noteRepository: NotesRepositoryInterface){}

   async execute({id, date,destinatario,n_ctrc,remetente,unidade,valor_ctrc}: EditNoteRequest): Promise<EditNoteResponse>{
    const note = await this.noteRepository.edit({date,destinatario,id,n_ctrc,remetente,unidade,valor_ctrc}, id)

    if(!note){
      throw new Error('Could not update note');
    }

    return {
      note
    }
    
  }

}
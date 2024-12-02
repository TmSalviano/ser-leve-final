export class ReceitaDTO {
  id?: number;
  usuarioId: number;
  titulo: string;
  resumo: string;
  descricao: string;
  imagem?: string;
  criado?: Date; // This can be optional when creating, but may be included in responses.
}
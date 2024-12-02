export class NotificacaoDTO {
    id?: number;          // Optional for creation, but included in responses
    mensagem: string;     // The content of the notification
    sentBy: number;       // ID of the user who sent the notification
    sendTo: number;       // ID of the user who will receive the notification
    criado?: Date;        // Optional, as Prisma will automatically set it during creation
  }
  
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { NotificacaoRepository } from './notificacao.repository';

@Controller('notificacao')
export class NotificacaoController {
  constructor(private readonly repo: NotificacaoRepository) {}

  @Post('postou/:usuarioId/:postId')
  async postou(@Param('usuarioId') usuarioId: string, @Param('postId') postId: number) {
    await this.repo.postouNotificacao(+usuarioId, postId);
    return { message: 'Notification for post created successfully.' };
  }

  @Post('curtiu/:usuarioId/:receitaId')
  async curtiu(@Param('usuarioId') usuarioId: string, @Param('receitaId') receitaId: string) {
    await this.repo.curtiuNotificacao(+usuarioId, +receitaId);
    return { message: 'Notification for like created successfully.' };
  }

  @Post('perfil-atualizado/:usuarioId')
  async perfilAtualizado(@Param('usuarioId') usuarioId: string) {
    await this.repo.perfilAtualizadoNotificacao(+usuarioId);
    return { message: 'Notification for profile update created successfully.' };
  }

  @Post('followed/:usuarioId/:followerId')
  async teSeguiu(@Param('usuarioId') usuarioId: string, @Param('followerId') followerId: string) {
    await this.repo.teSeguiuNotificacao(+usuarioId, +followerId);
    return { message: 'Notification for new follower created successfully.' };
  }

  @Post('newmessage/:usuarioId/:senderId')
  async mensagemRecebida(@Param('usuarioId') usuarioId: string, @Param('senderId') senderId: string) {
    await this.repo.mensagemRecebidaNotificacao(+usuarioId, +senderId);
    return { message: 'Notification for received message created successfully.' };
  }

  // Endpoint to get the latest notifications for the logged-in user
  @Get('latest/:usuarioId')
  async getLatestNotifications(@Param('usuarioId') usuarioId: string) {
    const notifications = await this.repo.getLatestNotifications(+usuarioId);
    return notifications;
  }


  // Endpoint to delete all notifications sent to a specific user
  @Post('delete-sent-to/:usuarioId')
  async deleteNotificationsSentTo(@Param('usuarioId') usuarioId: string) {
    await this.repo.deleteNotificationsSentTo(+usuarioId);
    return { message: `All notifications sent to user ${usuarioId} have been deleted.` };
  }

  // Endpoint to delete all notifications sent by a specific user
  @Post('delete-sent-by/:usuarioId')
  async deleteNotificationsSentBy(@Param('usuarioId') usuarioId: string) {
    await this.repo.deleteNotificationsSentTo(+usuarioId);
    return { message: `All notifications sent by user ${usuarioId} have been deleted.` };
  }
}

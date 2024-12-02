import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/dev-db/prisma.service';

@Injectable()
export class NotificacaoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // 1. Algum Postou
  async postouNotificacao(usuarioId: number, postId: number): Promise<void> {
    // Check if the post is made by the logged-in user or someone they follow
    const post = await this.prismaService.receita.findUnique({
      where: { Id: postId },
      select: { UsuarioId: true },
    });

    if (!post) return; // If the post doesn't exist, exit

    if (post.UsuarioId !== usuarioId) {
      const userFollowing = await this.prismaService.follow.findFirst({
        where: {
          FollowerId: usuarioId,
          FollowingId: post.UsuarioId,
        },
      });

      if (!userFollowing) return; // If the user doesn't follow this person, exit
    }

    // Create notification if it's a valid post
    await this.prismaService.notificacao.create({
      data: {
        Mensagem: `Someone posted a new post: ${postId}`,
        SentBy: post.UsuarioId,
        SendTo: usuarioId,
      },
    });
  }

  // 2. Algum Curtiu
  async curtiuNotificacao(usuarioId: number, receitaId: number): Promise<void> {
    // Check if the recipe exists
    const receita = await this.prismaService.receita.findUnique({
      where: { Id: receitaId },
    });
  
    if (!receita) return; // If the recipe doesn't exist, exit
  
    // Assume that this action comes from a "like" event (e.g., a button clicked by the user)
    // Create notification for the user
    await this.prismaService.notificacao.create({
      data: {
        Mensagem: `Your post "${receita.Titulo}" was liked!`,
        SentBy: usuarioId,
        SendTo: receita.UsuarioId, // Notifying the post author
      },
    });
  }

  // 3. Seu Perfil Foi Atualizado
  async perfilAtualizadoNotificacao(usuarioId: number): Promise<void> {
    // Create notification when the user updates their profile
    await this.prismaService.notificacao.create({
      data: {
        Mensagem: 'Your profile was updated.',
        SentBy: usuarioId,
        SendTo: usuarioId,
      },
    });
  }

  // 4. Algum Te Seguiu
  async teSeguiuNotificacao(usuarioId: number, followerId: number): Promise<void> {
    // Create notification when someone follows the user
    const user = await this.prismaService.usuario.findUnique({
      where: { Id: usuarioId },
    });

    if (!user) return;

    await this.prismaService.notificacao.create({
      data: {
        Mensagem: `${user.NameTag} started following you.`,
        SentBy: followerId,
        SendTo: usuarioId,
      },
    });
  }

  // 5. Algum Te Mandou Uma Mensagem
  async mensagemRecebidaNotificacao(usuarioId: number, senderId: number): Promise<void> {
    // Create notification when someone sends a message to the user
    await this.prismaService.notificacao.create({
      data: {
        Mensagem: 'You received a new message.',
        SentBy: senderId,
        SendTo: usuarioId,
      },
    });
  }

  // Helper function to get the latest notifications for the logged-in user
  async getLatestNotifications(usuarioId: number, limit: number = 5) {
    return this.prismaService.notificacao.findMany({
      where: {
        OR: [
          { SendTo: usuarioId },
          { SentBy: usuarioId },
        ],
      },
      orderBy: {
        Criado: 'desc',
      },
      take: limit,
    });
  }

// Delete all notifications sent to a specific user
async deleteNotificationsSentTo(usuarioId: number): Promise<void> {
    await this.prismaService.notificacao.deleteMany({
      where: {
        SendTo: usuarioId,
      },
    });
  }

  // Delete all notifications sent by a specific user
  async deleteNotificationsSentBy(usuarioId: number): Promise<void> {
    await this.prismaService.notificacao.deleteMany({
      where: {
        SentBy: usuarioId,
      },
    });
  }

}

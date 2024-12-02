import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/dev-db/prisma.service';

@Injectable()
export class FollowRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async followUser(currentUserId: number, targetUserId: number) {
        return await this.prismaService.follow({
          data: {
            followerId: currentUserId,
            followingId: targetUserId,
          },
        });
      }
    
      async unfollowUser(currentUserId: number, targetUserId: number) {
        return await this.prismaService.follow.delete({
          where: {
            followerId_followingId: {
              followerId: currentUserId,
              followingId: targetUserId,
            },
          },
        });
      }
    
      async getFollowers(userId: number) {
        return await this.prismaService.usuario.findUnique({
          where: { Id: userId },
          include: {
            Followers: {
              include: {
                follower: true,
              },
            },
          },
        });
      }
    
      async getFollowing(userId: number) {
        return await this.prismaService.usuario.findUnique({
          where: { Id: userId },
          include: {
            Following: {
              include: {
                following: true,
              },
            },
          },
        });
      }
}

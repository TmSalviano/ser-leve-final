import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/dev-db/prisma.service';

@Injectable()
export class FollowRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async followUser(currentUserId: number, targetUserId: number) {
        return await this.prismaService.follow.create ({
          data: {
            FollowerId: currentUserId,
            FollowingId: targetUserId,
          },
        });
      }
    
      async unfollowUser(currentUserId: number, targetUserId: number) {
        return await this.prismaService.follow.delete({
          where: {
            FollowerId_FollowingId: {
              FollowerId: currentUserId,
              FollowingId: targetUserId,
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
                Follower: true,
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
                Following: true,
              },
            },
          },
        });
      }
    async deleteAllFollowing(userId: number) {
      return await this.prismaService.follow.deleteMany({
        where: {
          FollowerId: userId, // Deleting all following relationships where the user is the follower
        },
      });
    }

    async deleteAllFollowers(userId: number) {
      return await this.prismaService.follow.deleteMany({
        where: {
          FollowingId: userId, // Deleting all following relationships where the user is the following
        },
      });
    }

    async getFollowingIds(userId: number): Promise<number[]> {
      const following = await this.prismaService.follow.findMany({
        where: {
          FollowerId: userId, // Get all users that the user is following
        },
        select: {
          FollowingId: true, // Only select the FollowingId (user ids the current user is following)
        },
      });
  
      return following.map(follow => follow.FollowingId);
    }

    async getFollowersIds(userId: number): Promise<number[]> {
      const followers = await this.prismaService.follow.findMany({
        where: {
          FollowingId: userId, // Get all users who are following the given user
        },
        select: {
          FollowerId: true, // Only select the FollowerId (user ids that are following the current user)
        },
      });
  
      return followers.map(follow => follow.FollowerId);
    }
} 

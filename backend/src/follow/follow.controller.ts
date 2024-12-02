import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FollowRepository } from './follow.repository';

@Controller('follow')
export class FollowController {
    constructor(private readonly followRepo: FollowRepository) {}

  @Post('follow')
  async followUser(@Body() { targetUserId }: { targetUserId: number }) {
    const currentUserId = 1; // Retrieve from JWT or session
    return this.followRepo.followUser(currentUserId, targetUserId);
  }

  @Post('unfollow')
  async unfollowUser(@Body() { targetUserId }: { targetUserId: number }) {
    const currentUserId = 1; // Retrieve from JWT or session
    return this.followRepo.unfollowUser(currentUserId, targetUserId);
  }

  @Get('followers/:userId')
  async getFollowers(@Param('userId') userId: number) {
    return this.followRepo.getFollowers(userId);
  }

  @Get('following/:userId')
  async getFollowing(@Param('userId') userId: number) {
    return this.followRepo.getFollowing(userId);
  }
}

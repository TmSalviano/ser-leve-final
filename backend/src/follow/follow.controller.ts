import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FollowRepository } from './follow.repository';

@Controller('/api/follow')
export class FollowController {
    constructor(private readonly followRepo: FollowRepository) {}

  @Post('follow/:Id')
  async followUser(@Param('Id') currentUserId: string, @Body() { targetUserId }: { targetUserId: number }) {
    return this.followRepo.followUser(+currentUserId, targetUserId);
  }

  @Post('unfollow/:Id')
  async unfollowUser(@Param('Id') currentUserId: string, @Body() { targetUserId }: { targetUserId: number }) {
    return this.followRepo.unfollowUser(+currentUserId, targetUserId);
  }

  @Get('followers/:Id')
  async getFollowers(@Param('Id') userId: string) {
    return this.followRepo.getFollowers(+userId);
  }

  @Get('following/:Id')
  async getFollowing(@Param('Id') userId: string) {
    return this.followRepo.getFollowing(+userId);
  }
}

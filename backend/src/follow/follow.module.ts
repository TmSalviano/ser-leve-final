import { Module } from '@nestjs/common';
import { FollowRepository } from './follow.repository';
import { DevDbModule } from 'src/dev-db/dev-db.module';
import { FollowController } from './follow.controller';

@Module({
  imports: [DevDbModule],
  providers: [FollowRepository],
  controllers: [FollowController],
  exports: [FollowRepository],
})
export class FollowModule {
    
}

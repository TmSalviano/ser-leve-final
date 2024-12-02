import { Module } from '@nestjs/common';
import { FollowRepository } from './follow.repository';
import { FollowControllerController } from './follow.controller.controller';
import { DevDbModule } from 'src/dev-db/dev-db.module';

@Module({
  imports: [DevDbModule],
  providers: [FollowRepository],
  controllers: [FollowControllerController],
  exports: [FollowRepository],
})
export class FollowModule {
    
}

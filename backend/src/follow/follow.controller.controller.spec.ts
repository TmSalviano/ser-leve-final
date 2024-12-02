import { Test, TestingModule } from '@nestjs/testing';
import { FollowControllerController } from './follow.controller.controller';

describe('FollowControllerController', () => {
  let controller: FollowControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowControllerController],
    }).compile();

    controller = module.get<FollowControllerController>(FollowControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RegController } from './reg.controller';

describe('RegController', () => {
  let controller: RegController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegController],
    }).compile();

    controller = module.get<RegController>(RegController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

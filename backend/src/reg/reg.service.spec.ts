import { Test, TestingModule } from '@nestjs/testing';
import { RegService } from './reg.service';

describe('RegService', () => {
  let service: RegService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegService],
    }).compile();

    service = module.get<RegService>(RegService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

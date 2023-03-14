import { Test, TestingModule } from '@nestjs/testing';
import { NodeGeneratorService } from './node-generator.service';

describe('NodeGeneratorService', () => {
  let service: NodeGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeGeneratorService],
    }).compile();

    service = module.get<NodeGeneratorService>(NodeGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

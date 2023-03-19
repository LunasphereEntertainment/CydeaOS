import { Test, TestingModule } from '@nestjs/testing';
import { NodeManagementService } from './node-management.service';

describe('NodeManagementService', () => {
  let service: NodeManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeManagementService],
    }).compile();

    service = module.get<NodeManagementService>(NodeManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

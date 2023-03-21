import { Test, TestingModule } from '@nestjs/testing';
import { NodeManagementGateway } from './node-management.gateway';

describe('NodeManagementGateway', () => {
  let gateway: NodeManagementGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeManagementGateway],
    }).compile();

    gateway = module.get<NodeManagementGateway>(NodeManagementGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

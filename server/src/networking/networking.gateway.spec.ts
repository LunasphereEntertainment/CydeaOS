import { Test, TestingModule } from '@nestjs/testing';
import { NetworkingGateway } from './networking.gateway';

describe('NetworkingGateway', () => {
  let gateway: NetworkingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetworkingGateway],
    }).compile();

    gateway = module.get<NetworkingGateway>(NetworkingGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

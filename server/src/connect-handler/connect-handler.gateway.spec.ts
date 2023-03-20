import { Test, TestingModule } from '@nestjs/testing';
import { PlayerConnectionHandlerGateway } from './player-connection-handler.gateway';

describe('ConnectHandlerGateway', () => {
  let gateway: PlayerConnectionHandlerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerConnectionHandlerGateway],
    }).compile();

    gateway = module.get<PlayerConnectionHandlerGateway>(PlayerConnectionHandlerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

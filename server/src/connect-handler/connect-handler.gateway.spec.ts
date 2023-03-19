import { Test, TestingModule } from '@nestjs/testing';
import { ConnectHandlerGateway } from './connect-handler.gateway';

describe('ConnectHandlerGateway', () => {
  let gateway: ConnectHandlerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectHandlerGateway],
    }).compile();

    gateway = module.get<ConnectHandlerGateway>(ConnectHandlerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

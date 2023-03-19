import { Test, TestingModule } from '@nestjs/testing';
import { CommandRunnerGateway } from './command-runner.gateway';

describe('CommandRunnerGateway', () => {
  let gateway: CommandRunnerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandRunnerGateway],
    }).compile();

    gateway = module.get<CommandRunnerGateway>(CommandRunnerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

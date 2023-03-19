import { Test, TestingModule } from '@nestjs/testing';
import { FileSystemGateway } from './file-system.gateway';

describe('FileSystemGateway', () => {
  let gateway: FileSystemGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileSystemGateway],
    }).compile();

    gateway = module.get<FileSystemGateway>(FileSystemGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

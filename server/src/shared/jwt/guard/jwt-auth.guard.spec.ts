import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '../jwt.service';
import { Test } from '@nestjs/testing';

describe('JwtAuthGuard', () => {

  let jwtAuthGuard: JwtAuthGuard;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
        providers: [JwtAuthGuard, JwtService],
    }).compile();

    jwtAuthGuard = module.get<JwtAuthGuard>(JwtAuthGuard);
  })

  it('should be defined', () => {
    expect(jwtAuthGuard).toBeDefined();
  });
});

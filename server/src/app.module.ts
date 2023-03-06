import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { JwtService } from './jwt/jwt.service';

@Module({
  imports: [GameModule],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}

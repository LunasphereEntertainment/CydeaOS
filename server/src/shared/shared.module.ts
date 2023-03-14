import { Module } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { JwtAuthGuard } from '../jwt/guard/jwt-auth.guard';

@Module({
    providers: [JwtService, JwtAuthGuard],
    exports: [JwtService, JwtAuthGuard]
})
export class SharedModule {}
import { Module } from '@nestjs/common';
import { JwtAuthGuard } from "./jwt/guard/jwt-auth.guard";
import { JwtService } from "./jwt/jwt.service";

@Module({
    providers: [JwtService, JwtAuthGuard],
    exports: [JwtService, JwtAuthGuard]
})
export class SharedModule {}

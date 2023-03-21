import { Controller, Get } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { Account } from '@cydeaos/libs/luna/account';
import { JwtService } from './shared/jwt/jwt.service';

@Controller()
@WebSocketGateway({ cors: process.env.CORS === 'true' })
// @UseGuards(JwtAuthGuard)
export class AppController /*implements OnGatewayConnection, OnGatewayDisconnect*/ {
    constructor(private jwtService: JwtService) {}

    @Get('test')
    getTestJwt(): string {
        const testAccount = <Account>{id: 1, username: "leila-codes"};
        return this.jwtService.createToken(testAccount);
    }
}


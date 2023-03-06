import { Controller } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';

@Controller()
@WebSocketGateway()
// @UseGuards(JwtAuthGuard)
export class AppController /*implements OnGatewayConnection, OnGatewayDisconnect*/ {
    constructor() {}

/*    handleConnection(client: any, ...args: any[]) {
        console.log('Client connected');
    }

    handleDisconnect(client: any) {
        console.log('Client disconnected');
    }*/
}


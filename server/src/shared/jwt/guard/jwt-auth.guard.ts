import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '../jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        let client,
            token;

        switch (context.getType()) {
            case 'http':
                client = context.switchToHttp().getRequest();
                token = client.headers.authorization;
                break;
            case 'ws':
                client = context.switchToWs().getClient();
                token = client.handshake.headers.authorization;
                break;
            default:
                console.error('Unknown context type: ' + context.getType());
                return false;
        }

        if (!token) {
            return false;
        }

        const decoded = this.jwtService.decodeToken(token);
        if (!decoded) {
            return false;
        }

        client.user = decoded;

        return true;
    }
}

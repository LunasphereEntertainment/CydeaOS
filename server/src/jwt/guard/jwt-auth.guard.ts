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
        const client = context.switchToWs().getClient(),
            request = client.handshake;

        // console.log(request);

        const token = request.headers.authorization;
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

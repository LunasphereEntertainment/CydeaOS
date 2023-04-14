import { Injectable } from '@nestjs/common';
import { Account } from '@cydeaos/libs/luna/account';
import { sign, verify } from 'jsonwebtoken';

const JwtSecret = process.env.JWT_SECRET || 'secret'

@Injectable()
export class JwtService {
    constructor() {
    }

    createToken(account: Account): string {
        return sign({
            id: account.id,
            username: account.username,
        }, JwtSecret, { algorithm: 'HS512', expiresIn: '2 days' })
    }

    decodeToken(authHeader: string): Account | null {
        const token = authHeader.split(' ')[1];

        try {
            const decoded = verify(token, JwtSecret, { algorithms: [ 'HS512' ] });
            return {
                id: decoded['id'],
                username: decoded['username']
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}

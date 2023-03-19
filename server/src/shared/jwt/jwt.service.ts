import { Injectable } from '@nestjs/common';
import { Account } from '../../../../libs/luna/account';
import { sign, decode } from 'jsonwebtoken';

const JwtSecret = process.env.JWT_SECRET || 'secret'

@Injectable()
export class JwtService {
    constructor() {}

    createToken(account: Account): string {
        return sign({
            id: account.id,
            username: account.username,
        }, JwtSecret, { algorithm: 'HS512', expiresIn: '4h' })
    }

    decodeToken(token: string): Account {
        try {
            const decoded = decode(token, { complete: true });
            return {
                id: decoded.payload['id'],
                username: decoded.payload['username']
            }
        } catch (e) {
            return null;
        }
    }
}

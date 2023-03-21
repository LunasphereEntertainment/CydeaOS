import { Account } from '@cydeaos/libs/luna/account';
import { Socket } from 'socket.io';

export interface AuthSocket extends Socket {
    user: Account;
}

import { Account } from "./luna-models/account";
import { Socket } from "socket.io";

export interface AuthSocket extends Socket {
    user: Account;
}

import { NgModule } from '@angular/core';
import { SocketService } from './socket.service';


@NgModule({
  providers: [
    SocketService
  ]
})
export class SharedModule {
}

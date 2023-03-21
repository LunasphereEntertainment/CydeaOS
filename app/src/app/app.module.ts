import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { GameLauncherComponent } from './game-launcher/game-launcher.component';
import { HostGameComponent } from './game-management-routes/host-game/host-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HostGameSetupComponent } from './game-management-routes/host-game-setup/host-game-setup.component';
import { GameManagementService } from "./game-management-routes/game-management.service";
import { JoinGameComponent } from './game-management-routes/join-game/join-game.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameLauncherComponent,
    HostGameSetupComponent,
    HostGameComponent,
    JoinGameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GameManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

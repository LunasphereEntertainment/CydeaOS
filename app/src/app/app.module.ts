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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HostGameSetupComponent } from './game-management-routes/host-game-setup/host-game-setup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameLauncherComponent,
    HostGameSetupComponent,
    HostGameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

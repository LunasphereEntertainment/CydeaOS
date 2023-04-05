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
import { GameDesktopContainerComponent } from './core-game/game-desktop-container/game-desktop-container.component';
import { AudioMixerComponent } from './core-game/audio-mixer/audio-mixer.component';
import { HttpClientModule } from '@angular/common/http';
import { PermissionsPromptComponent } from './game-launcher/permissions-prompt/permissions-prompt.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TerminalEmulatorComponent } from './core-game/terminal-emulator/terminal-emulator.component';
import { FileBrowserEmulatorComponent } from './core-game/file-browser-emulator/file-browser-emulator.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameLauncherComponent,
    HostGameSetupComponent,
    HostGameComponent,
    JoinGameComponent,
    GameDesktopContainerComponent,
    AudioMixerComponent,
    PermissionsPromptComponent,
    TerminalEmulatorComponent,
    FileBrowserEmulatorComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    GameManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

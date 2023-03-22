import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostGameComponent } from './game-management-routes/host-game/host-game.component';
import { GameLauncherComponent } from './game-launcher/game-launcher.component';
import { HostGameSetupComponent } from './game-management-routes/host-game-setup/host-game-setup.component';
import { JoinGameComponent } from "./game-management-routes/join-game/join-game.component";
import { GameDesktopContainerComponent } from './core-game/game-desktop-container/game-desktop-container.component';

const routes: Routes = [
  { path: 'host-setup', component: HostGameSetupComponent },
  { path: 'host', component: HostGameComponent },
  { path: 'join', component: JoinGameComponent },
  { path: 'game', component: GameDesktopContainerComponent, /*canActivate: [() => !!localStorage.getItem('gameCode')]*/ },
  { path: '', component: GameLauncherComponent, pathMatch: 'full'},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

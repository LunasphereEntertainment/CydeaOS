import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostGameComponent } from './game-management-routes/host-game/host-game.component';
import { GameLauncherComponent } from './game-launcher/game-launcher.component';
import { HostGameSetupComponent } from './game-management-routes/host-game-setup/host-game-setup.component';

const routes: Routes = [
  { path: 'host-setup', component: HostGameSetupComponent },
  { path: 'host', component: HostGameComponent },
  { path: '', component: GameLauncherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

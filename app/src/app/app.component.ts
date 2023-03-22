import { Component } from '@angular/core';
import {
  angleIcon,
  arrowIcon,
  boltIcon,
  ClarityIcons,
  cogIcon,
  exclamationTriangleIcon,
  infoCircleIcon,
  playIcon,
  plusIcon,
  targetIcon,
  timesCircleIcon,
  userIcon
} from '@cds/core/icon'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '@cydeaos/webui';

  currentUser = {username: 'leila-codes'}

  constructor() {
    ClarityIcons.addIcons(targetIcon);
    ClarityIcons.addIcons(cogIcon);
    ClarityIcons.addIcons(boltIcon);
    ClarityIcons.addIcons(plusIcon);
    ClarityIcons.addIcons(playIcon);
    ClarityIcons.addIcons(arrowIcon);
    ClarityIcons.addIcons(angleIcon);
    ClarityIcons.addIcons(userIcon);
    ClarityIcons.addIcons(timesCircleIcon);
    ClarityIcons.addIcons(infoCircleIcon);
    ClarityIcons.addIcons(exclamationTriangleIcon);
  }
}

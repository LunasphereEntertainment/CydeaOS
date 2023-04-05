import { Component } from '@angular/core';
import {
  angleIcon, arrowIcon, boltIcon, checkIcon, ClarityIcons, cogIcon, exclamationTriangleIcon, fileIcon, folderIcon, folderOpenIcon, infoCircleIcon, playIcon,
  plusIcon, targetIcon, terminalIcon, timesCircleIcon, userIcon
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
    ClarityIcons.addIcons(checkIcon);
    ClarityIcons.addIcons(timesCircleIcon);
    ClarityIcons.addIcons(terminalIcon);
    ClarityIcons.addIcons(infoCircleIcon);
    ClarityIcons.addIcons(folderOpenIcon);
    ClarityIcons.addIcons(folderIcon);
    ClarityIcons.addIcons(fileIcon);
    ClarityIcons.addIcons(exclamationTriangleIcon);
  }
}

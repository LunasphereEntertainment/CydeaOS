import { Component } from '@angular/core';
import { AutoplayService, AutoplayState } from './autoplay.service';
import { filter } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-permissions-prompt',
  templateUrl: './permissions-prompt.component.html',
  styleUrls: ['./permissions-prompt.component.scss']
})
export class PermissionsPromptComponent {
  isOpen = false;

  musicEnabled = new FormControl(true);
  soundEnabled = new FormControl(true);

  constructor(private autoplayService: AutoplayService) {
    this.autoplayService.ee.pipe(
      filter((state) => state === AutoplayState.RequiresInteraction)
    ).subscribe(() => {
      this.isOpen = true;
    });
  }

  close() {
    this.isOpen = false;

    if (this.musicEnabled.value) {
      this.autoplayService.notifyApproval();
    }
  }
}

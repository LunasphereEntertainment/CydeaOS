import { Component, OnInit } from '@angular/core';
import { FileType, IFileEntry } from '@cydeaos/libs/nodes/file-system/i-file-entries';
import { GameStateService } from '../game-state.service';
import { SocketService } from '../../shared/socket.service';
import { FileSystemEvent, FileSystemEventType } from '@cydeaos/libs/events/file-system-event/file-system-event';

@Component({
  selector: 'app-file-browser-emulator',
  templateUrl: './file-browser-emulator.component.html',
  styleUrls: [ './file-browser-emulator.component.scss' ]
})
export class FileBrowserEmulatorComponent implements OnInit {
  fileTypes = FileType
  fileListing: IFileEntry[] = [];
  currentPath: string = '';
  currentIp: string = 'localhost';

  constructor(private gameStateService: GameStateService, private socketService: SocketService) {
  }

  ngOnInit() {
    this.gameStateService.currentTarget.subscribe(target => {
      this.currentIp = target;
    })

    this.gameStateService.currentPath.subscribe(path => {
      this.currentPath = path;

      this.refreshFileListing();
    })
  }

  refreshFileListing() {
    this.socketService.sendAndReceive<FileSystemEvent>(
      FileSystemEventType.ListFiles,
      <FileSystemEvent>{
        type: FileSystemEventType.ListFiles,
        ip: this.currentIp,
        path: this.currentPath,
      }).subscribe((files) => {
        if (files.file?.type !== FileType.Directory)
          this.fileListing = <IFileEntry[]>files.file!.content;
      });
  }

  navigateTo(path: string) {
    this.gameStateService.changePath(path);
  }
}

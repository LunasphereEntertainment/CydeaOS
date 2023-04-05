import { Component } from '@angular/core';
import { FileType, IFileEntry } from "@cydeaos/libs/nodes/file-system/i-file-entries";

@Component({
  selector: 'app-file-browser-emulator',
  templateUrl: './file-browser-emulator.component.html',
  styleUrls: ['./file-browser-emulator.component.scss']
})
export class FileBrowserEmulatorComponent {
  fileTypes = FileType

  currentPath: string = '/';
  fileListing: IFileEntry[] = [
    {
      name: 'home',
      type: FileType.Directory,
      content: [
        {
          name: 'test.txt',
          type: FileType.Text,
          content: 'This is a test file.'
        }
      ]
    },
    {
      name: "bin",
      type: FileType.Directory,
      content: [
        {
          name: "test.exe",
          type: FileType.Executable,
          content: "This is a test executable."
        }
      ]
    },
    {
      name: "etc",
      type: FileType.Directory,
      content: [
        {
          name: "test.conf",
          type: FileType.Text,
          content: "This is a test config file."
        }
      ]
    }
  ];

  constructor() {
  }

  navigateTo(path: string) {
    this.currentPath = path;

    // TODO: Update file listed
  }
}

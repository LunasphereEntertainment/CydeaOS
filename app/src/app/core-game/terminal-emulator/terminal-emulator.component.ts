import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { GameStateService } from "../game-state.service";
import { SocketService } from "../../shared/socket.service";
import { CommandRunnerEvent, CommandRunnerEventType } from "@cydeaos/libs/events/command-runner-event/command-runner-event";
import { CurrentGameService } from "../../shared/current-game.service";

enum StdoutLineType {
  Stdout = 'stdout',
  Stderr = 'stderr',
}

export interface StdoutLine {
  text: string;
  type: 'stdout' | 'stderr';
}

@Component({
  selector: 'app-terminal-emulator',
  templateUrl: './terminal-emulator.component.html',
  styleUrls: ['./terminal-emulator.component.scss']
})
export class TerminalEmulatorComponent implements OnInit {
  status: string = 'idle';
  stdout: StdoutLine[] = [];
  prompt: string = '';
  input: string = '';
  inputHistory: string[] = [];

  lineType = StdoutLineType;

  private currentPath: string = '';

  constructor(
    private gameStateService: GameStateService,
    private socketService: SocketService,
    private currentGameService: CurrentGameService
  ) { }

  ngOnInit(): void {
    // listen for changes to the connected computer.
    this.gameStateService.currentTarget.subscribe((target) => {
      this.status = `connected to ${target}`;
      // update the terminal prompt
      this.prompt = `root@${target}:${this.currentPath} > `;
    })

    // listen for command success results
    this.socketService.listen<CommandRunnerEvent>(CommandRunnerEventType.ExecuteCommandResult)
      .subscribe((event) => {
        if (event.result)
          this.stdout.push({type: StdoutLineType.Stdout, text: event.result});
      });

    // listen for command error results
    this.socketService.listen<CommandRunnerEvent>(CommandRunnerEventType.ExecuteCommandError)
      .subscribe((event) => {
        this.stdout.push({type: StdoutLineType.Stderr, text: event.error!});
      });
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.inputHistory.push(this.input);

      // TODO: Execute command
      this.executeCommand(this.input);

      event.preventDefault();
      this.input = '';
    }
  }

  executeCommand(command: string) {
    this.stdout.push({type: StdoutLineType.Stdout, text: `${this.prompt}${this.input}`});

    switch(command) {
      case 'clear':
        this.stdout = [];
        return;
        case 'help':
          this.stdout.push({type: StdoutLineType.Stdout, text: 'Available commands:'});
          this.stdout.push({type: StdoutLineType.Stdout, text: 'help - show this help message'});
          this.stdout.push({type: StdoutLineType.Stdout, text: 'clear - clear the terminal'});
          this.stdout.push({type: StdoutLineType.Stdout, text: 'ls - list files in the current directory'});
          this.stdout.push({type: StdoutLineType.Stdout, text: 'cd - change the current directory'});
          this.stdout.push({type: StdoutLineType.Stdout, text: 'cat - print the contents of a file'});
          return;
    }

    this.socketService.blindSend(CommandRunnerEventType.ExecuteCommand, {command: command, gameCode: localStorage['gameCode']});
  }

}

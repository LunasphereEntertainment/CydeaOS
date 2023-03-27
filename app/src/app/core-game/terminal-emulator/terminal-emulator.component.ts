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
    this.gameStateService.currentTarget.subscribe((target) => {
      this.status = `connected to ${target}`;

      this.prompt = `root@${target}:${this.currentPath} > `;
    })

    this.socketService.listen<CommandRunnerEvent>(CommandRunnerEventType.ExecuteCommandResult)
      .subscribe((event) => {
        if (event.result)
          this.stdout.push({type: StdoutLineType.Stdout, text: event.result});
      });

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

    this.socketService.blindSend(CommandRunnerEventType.ExecuteCommand, {command: command, gameCode: localStorage['gameCode']});
  }

}

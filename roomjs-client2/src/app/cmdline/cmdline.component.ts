import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * Command line input
 */

export enum Keys { // FIXME
    UP = 38,
    DOWN = 40,
    TAB = 9,
    V = 86,
    P = 80
}

@Component({
  selector: 'app-cmdline',
  templateUrl: './cmdline.component.html',
  styleUrls: ['./cmdline.component.css']
})
export class CmdlineComponent implements OnInit {
  // Private variables
  private history: string[] = [];
  private currentHistory: number = -1;
  private maxHistory = 200; // FIXME TODO configurable
  public command: string;

  // Bindings
  @Input()  prompt = '';
  @Output() commandEntered = new EventEmitter<string>();
  @Output() modeChange = new EventEmitter<number>();

  // Constructor
  constructor() { }

  ngOnInit() {
  }

  // Private methods
  private addToHistory(command: string) {
    this.history.unshift(command);
    if (this.history.length > this.maxHistory) {
      this.truncateHistory();
    }
    this.currentHistory = -1;
  }

  private truncateHistory() {
    this.history = this.history.slice(0, this.maxHistory);
  }

  // Event handlers
  public onSubmit() {
    this.commandEntered.next(this.command);
    this.addToHistory(this.command);
    this.command = '';
  }

  public onKeyDown(event: KeyboardEvent) {
    const key = event.keyCode;
    const meta = event.metaKey;
    const ctrl = event.ctrlKey;
    const shift = event.shiftKey;
    const vKey = key === Keys.V;
    const upKey = key === Keys.UP;
    const downKey = key === Keys.DOWN;
    const tabKey = key === Keys.TAB;

    if ((meta && !vKey) || (ctrl && !vKey)) {
      return true;
    }

    if (upKey || downKey) {
      return this.onHistoryRecall(key);
    }

    if (tabKey) {
      const direction = shift ? -1 : 1;
      this.modeChange.emit(direction);
      return false;
    }

    return true;
  }

  private onHistoryRecall(key: number) {
    if (this.history.length === 0) {
      return true;
    }

    switch (key) {
      case Keys.UP: {
        if (this.currentHistory < this.history.length - 1) {
          this.currentHistory++;
        }
        this.command = this.history[this.currentHistory];
        return false;
      }
      case Keys.DOWN: {
        if (this.currentHistory > -1) {
          this.currentHistory--;
        }
        if (this.currentHistory >= 0) {
          this.command = this.history[this.currentHistory];
        } else {
          this.command = '';
        }
        break;
      }
      default: {
        break;
      }
    }
    return true;
  }

}

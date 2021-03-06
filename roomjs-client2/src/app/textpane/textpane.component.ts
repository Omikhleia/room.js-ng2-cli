import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { TextService } from '../text.service';

import * as ansi_up from 'ansi_up';

/**
 * Text displaying area.
 */

@Component({
  selector: 'app-textpane',
  templateUrl: './textpane.component.html',
  styleUrls: ['./textpane.component.css']
})
export class TextpaneComponent implements OnInit, OnDestroy {
  public lines: string[] = [];
  private maxLines = 200; // FIXME TODO configurable
  private subscription;

  @Output() commandEntered = new EventEmitter<string>();

  constructor(private textService: TextService) { }

  ngOnInit() {
    this.subscription = this.textService.text$.subscribe( text => {
      this.lines.push(this.colorize(ansi_up.escape_for_html(text)));

      if (this.lines.length > this.maxLines) {
        // Truncate old lines
        const delta = this.lines.length - this.maxLines;
        this.lines = this.lines.slice(delta);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private linkifyCommands(str: string) {
    const pattern = /#cmd\[(.*?)\]/g;
    return str.replace(pattern, (match, capture) => `<a href='${match}'>${capture}</a>`);
  }

  private colorize(str: string) {
    return this.linkifyCommands(ansi_up.ansi_to_html(str, { use_classes: true }));
  }

  public onClick(event: any) {
    if (event.target && event.target.hash) {
      // Check for command pattern
      const pattern = /#cmd\[(.*?)\]/g;
      const match = pattern.exec(event.target.hash);
      if (!match) {
        return;
      }

      // URI-encoded on some browsers (e.g. Firefox), so ensure decoding
      // Prefix with @ for direct playmode command
      const command = '@' + decodeURIComponent(match[1]);

      // Emit command
      this.commandEntered.emit(command);
      event.preventDefault();
    }
  }
}

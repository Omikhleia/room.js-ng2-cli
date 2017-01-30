import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { SocketService } from '../socket.service';

@Component({
  selector: 'app-verb-editor',
  templateUrl: './verb-editor.component.html',
  styleUrls: ['./verb-editor.component.css']
})
export class VerbEditorComponent implements OnInit {
  @Input() data: any = {};
  @Output() dirty = new EventEmitter<boolean>();
  
  private cmconfig: any = {
    lineNumbers: true,
    tabSize: 2,
    indentWithTabs: false,
    matchBrackets: true,
    autoCloseBrackets: true,
    scrollbarStyle: 'overlay',
    theme: 'solarized light'
  };

  private code: string;
  private pattern: string;
  private dobjarg: string;
  private iobjarg: string;
  private preparg: string;
  
  constructor(private socketService: SocketService) {
  }

  ngOnInit() {
    this.code = this.data.verb.code;
    this.pattern = this.data.verb.pattern;
    this.dobjarg = this.data.verb.dobjarg;
    this.iobjarg = this.data.verb.iobjarg;
    this.preparg = this.data.verb.preparg;
  }

  /**
   * We want some key events to be application-global, and
   * forwarded from the main application module to the currently
   * active tab, if this public method exists.
   */
  public onForwardEvent(event: KeyboardEvent) {
    this.onKeyDown(event);
  }

  /**
   * Dirty flag logic for verbs.
   */
  private computeDirty(): boolean {
    const dirty = this.pattern !== this.data.verb.pattern ||
                  this.dobjarg !== this.data.verb.dobjarg ||
                  this.preparg !== this.data.verb.preparg ||
                  this.iobjarg !== this.data.verb.iobjarg ||
                  this.code !== this.data.verb.code;
    return dirty;
  }

  /**
   * Check dirty flag on model change, and notify parent components.
   */  
  private onChange() {
    const dirty = this.computeDirty();
    this.dirty.emit(dirty);
  }

  /**
   * Handle key events
   */
  private onKeyDown(event: KeyboardEvent) {
    const key = event.keyCode;
    const meta = event.metaKey;
    const ctrl = event.ctrlKey;
    const sKey = key === 83;

    if ((ctrl && sKey) || (meta && sKey)) {
      event.preventDefault();
      if (this.computeDirty()) {
        this.save();
      }
    }
  }

  /**
   * Save verb, invoking the socket service.
   */  
  private save() {
    const newVerb = {
      name: this.data.verb.name,
      pattern: this.pattern,
      dobjarg: this.dobjarg,
      preparg: this.preparg,
      iobjarg: this.iobjarg,
      code: this.code,
    };
    const params = {
      objectId: this.data.objectId,
      verb: newVerb,
    };
    
    this.socketService.saveVerb(params, response => {
      if (response === 'saved') {
        this.data.verb.code = this.code;
        this.data.verb.pattern = this.pattern;
        this.data.verb.dobjarg = this.dobjarg;
        this.data.verb.iobjarg = this.iobjarg;
        this.data.verb.preparg = this.preparg;
        this.dirty.emit(false);        
      } else {
        alert(response); // FIXME Have our own custom modal later
      }
    });
  }

}


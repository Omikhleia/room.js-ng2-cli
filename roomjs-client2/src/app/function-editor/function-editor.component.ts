import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

import { SocketService } from '../socket.service';

@Component({
  selector: 'app-function-editor',
  templateUrl: './function-editor.component.html',
  styleUrls: ['./function-editor.component.css']
})
export class FunctionEditorComponent implements OnInit {
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
  
  private src: string;
  
  constructor(private socketService: SocketService) {
  }

  ngOnInit() {
    this.src = this.data.src;
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
   * Dirty flag logic for function.
   */  
  private computeDirty(): boolean {
    const dirty = this.data.src !== this.src;
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
   * Save function, invoking the socket service.
   */
  private save() {
    const params = {
      name: this.data.name,
      src: this.src,
      objectId: this.data.objectId,
    };
 
    this.socketService.saveFunction(params, response => {
      if (response === 'saved') {
        this.data.src = this.src;
        this.dirty.emit(false);
      } else {
        alert(response); // FIXME Have our own custom modal later
      }
    });
  }
  
}

import { Component, OnInit } from '@angular/core';

import { ToasterService } from 'angular2-toaster';
import { SocketService } from '../socket.service';
import { BaseEditorComponent } from './base-editor.component';

/**
 * Editor component for text.
 */

@Component({
  selector: 'app-function-editor',
  templateUrl: './function-editor.component.html',
  styleUrls: ['./function-editor.component.css']
})
export class TextEditorComponent extends BaseEditorComponent implements OnInit {
  public src: string;
  public cmconfig: any = {
    lineNumbers: true,
    tabSize: 2,
    indentWithTabs: false,
    matchBrackets: true,
    autoCloseBrackets: true,
    scrollbarStyle: 'overlay',
    theme: 'solarized light',
    mode: 'null'
  };

  constructor(private socketService: SocketService, private toasterService: ToasterService) {
    super();
  }

  ngOnInit() {
    this.src = this.data.src;
  }

  public onChange() {
    // Make ng lint happy...
    super.onChange()
  }

  /**
   * Dirty flag logic for function.
   */
  protected computeDirty(): boolean {
    const dirty = this.data.src !== this.src;
    return dirty;
  }

  /**
   * Save function, invoking the socket service.
   */
  protected save() {
    const params = {
      name: this.data.name,
      src: this.src,
      objectId: this.data.objectId,
    };

    this.socketService.saveText(params, response => {
      if (response === 'saved') {
        this.toasterService.pop('success', 'Saved',
                                `${this.data.objectId}.${this.data.name} saved` );
        this.data.src = this.src;
        this.dirty.emit(false);
      } else {
        this.toasterService.pop('error', 'Save error',
                                `${this.data.objectId}: ${response}`);
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';

import { SocketService } from '../socket.service';
import { BaseEditorComponent } from '../base-editor/base-editor.component';

/**
 * Editor component for functions.
 */

@Component({
  selector: 'app-function-editor',
  templateUrl: './function-editor.component.html',
  styleUrls: ['./function-editor.component.css']
})
export class FunctionEditorComponent extends BaseEditorComponent implements OnInit {
  public src: string;

  constructor(private socketService: SocketService) {
    super();
  }

  ngOnInit() {
    this.src = this.data.src;
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

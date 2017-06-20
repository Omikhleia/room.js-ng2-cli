import { Component, OnInit } from '@angular/core';

import { SocketService } from '../socket.service';
import { BaseEditorComponent } from '../base-editor/base-editor.component';

/**
 * Editor component for verbs.
 */

@Component({
  selector: 'app-verb-editor',
  templateUrl: './verb-editor.component.html',
  styleUrls: ['./verb-editor.component.css']
})
export class VerbEditorComponent extends BaseEditorComponent implements OnInit {
  public code: string;
  public pattern: string;
  public dobjarg: string;
  public iobjarg: string;
  public preparg: string;

  constructor(private socketService: SocketService) {
    super();
  }

  ngOnInit() {
    this.code = this.data.verb.code;
    this.pattern = this.data.verb.pattern;
    this.dobjarg = this.data.verb.dobjarg;
    this.iobjarg = this.data.verb.iobjarg;
    this.preparg = this.data.verb.preparg;
  }

  /**
   * Dirty flag logic for verbs.
   */
  protected computeDirty(): boolean {
    const dirty = this.pattern !== this.data.verb.pattern ||
                  this.dobjarg !== this.data.verb.dobjarg ||
                  this.preparg !== this.data.verb.preparg ||
                  this.iobjarg !== this.data.verb.iobjarg ||
                  this.code !== this.data.verb.code;
    return dirty;
  }

  /**
   * Save verb, invoking the socket service.
   */
  protected save() {
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


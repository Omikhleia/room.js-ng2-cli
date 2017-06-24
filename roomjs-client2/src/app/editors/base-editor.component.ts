import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CodemirrorComponent } from 'ng2-codemirror-typescript/Codemirror';

/**
 * Base component for editors
 * Must be subclassed, and derived components shall have the @Component annotation
 * supplying the template and styling. The template shall have a codemirror element.
 */

@Component({
  selector: 'app-base-editor',
  template: '<div>Must be subclassed and contain a codemirror element</div>',
})
export class BaseEditorComponent {
  @Input() data: any = {};
  @Output() dirty = new EventEmitter<boolean>();
  @ViewChild(CodemirrorComponent) private codemirrorComponent: CodemirrorComponent;
  private initialChange = true;

  constructor() { }

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
  protected computeDirty(): boolean {
    throw new Error('Must be subclassed.');
  }

  /**
   * Clean history (exposed from the codemirror instance)
   */
  public clearHistory() {
    if (this.codemirrorComponent) {
      this.codemirrorComponent.instance.clearHistory();
    }
  }

  /**
   * Check dirty flag on model change, and notify parent components.
   */
  public onChange() {
    if (this.initialChange) {
      // Not sure there's a better way for doing this:
      // Clear history at first change (when data are initially loaded)
      // Otherwise Ctrl-Z (undo) will empty the editor...
      this.initialChange = false;
      this.clearHistory();
    }
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
   * Save function.
   */
  protected save() {
    throw new Error('Must be subclassed.');
  }

}

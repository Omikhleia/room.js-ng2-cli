import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Base component for editors
 * Must be subclassed, and derived components shall have the @Component annotation
 * supplying the template and styling.
 */

@Component({
  selector: 'app-base-editor',
  template: '<div>Must be subclassed</div>',
})
export class BaseEditorComponent {
  @Input() data: any = {};
  @Output() dirty = new EventEmitter<boolean>();

  protected cmconfig: any = {
    lineNumbers: true,
    tabSize: 2,
    indentWithTabs: false,
    matchBrackets: true,
    autoCloseBrackets: true,
    scrollbarStyle: 'overlay',
    theme: 'solarized light'
  };

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
   * Check dirty flag on model change, and notify parent components.
   */
  public onChange() {
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

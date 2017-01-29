import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

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
    tabSize: true,
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
  
  constructor() {
  }

  ngOnInit() {
    this.code = this.data.verb.code;
    this.pattern = this.data.verb.pattern;
    this.dobjarg = this.data.verb.dobjarg;
    this.iobjarg = this.data.verb.iobjarg;
    this.preparg = this.data.verb.preparg;
  }
  
  onModelChange() {
    let dirty = this.pattern !== this.data.verb.pattern ||
                this.dobjarg !== this.data.verb.dobjarg ||
                this.preparg !== this.data.verb.preparg ||
                this.iobjarg !== this.data.verb.iobjarg ||
                this.code !== this.data.verb.code;
    this.dirty.emit(dirty);
  }
  
  onKeyDown(event: KeyboardEvent) {
    const key = event.keyCode;
    const meta = event.metaKey;
    const ctrl = event.ctrlKey;
    const sKey = key === 83;

    if ((ctrl && sKey) || (meta && sKey)) {
      event.preventDefault();
      this.save();
    }
  }
  
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
    
    setTimeout(() => { alert("Save not implemented yet") }, 0); // FIXME
    /*  
    socketService.saveVerb(params, response => {
      if (response === 'saved') {
        this.data.verb.code = this.code;
        this.data.verb.pattern = this.pattern;
        this.data.verb.dobjarg = this.dobjarg;
        this.data.verb.iobjarg = this.iobjarg;
        this.data.verb.preparg = this.preparg;
        this.dirty.emit(false);        
      } else {
        // eslint-disable-next-line no-alert
        alert(response);
      }
    }
    */
  }

}


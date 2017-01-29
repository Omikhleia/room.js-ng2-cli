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

  private src: string;
  private pattern: string;
  private dobjarg: string;
  private iobjarg: string;
  private preparg: string;
  
  constructor() {
  }

  ngOnInit() {
    this.src = this.data.verb.code;
    this.pattern = this.data.verb.pattern;
    this.dobjarg = this.data.verb.dobjarg;
    this.iobjarg = this.data.verb.iobjarg;
    this.preparg = this.data.verb.preparg;
  }
  
  onChange() {
    this.dirty.emit(this.data.verb.code !== this.src);
  }
  
  onKeyDown(event: KeyboardEvent) {
    const key = event.keyCode;
    const meta = event.metaKey;
    const ctrl = event.ctrlKey;
    const sKey = key === 83;

    if ((ctrl && sKey) || (meta && sKey)) {
      event.preventDefault();
      
      console.log("SAVE"); // FIXME TODO
      setTimeout(() => { alert("Save not implemented yet") }, 0);;

      this.data.verb.code = this.src;
      this.dirty.emit(false);
    }
  }

}


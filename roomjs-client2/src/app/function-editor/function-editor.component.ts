import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

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
    tabSize: true,
    indentWithTabs: false,
    matchBrackets: true,
    autoCloseBrackets: true,
    scrollbarStyle: 'overlay',
    theme: 'solarized light'
  };
  
  private src: string;
  
  constructor() {
  }

  ngOnInit() {
    this.src = this.data.src;
  }
  
  private onChange() {
    this.dirty.emit(this.data.src !== this.src);
  }
  
  private onKeyDown(event: KeyboardEvent) {
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
    const params = {
      name: this.data.name,
      src: this.src,
      objectId: this.data.objectId,
    };
    
    setTimeout(() => { alert("Save not implemented yet") }, 0); // FIXME
    /*  
    socketService.saveVerb(params, response => {
      if (response === 'saved') {
        this.data.src = this.src;
        this.dirty.emit(false);
      } else {
        // eslint-disable-next-line no-alert
        alert(response);
      }
    }
    */
  }
  
}

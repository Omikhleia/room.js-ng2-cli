import { Component, Output, EventEmitter, OnInit,
         Input, ViewChild, ViewChildren, ElementRef, Renderer, OnChanges } from '@angular/core';

import { SocketService } from '../socket.service';
import { FunctionEditorComponent } from '../function-editor/function-editor.component';
import { VerbEditorComponent } from '../verb-editor/verb-editor.component';

// FIXME Put all definitions elswhere...

interface editorCallback { (data: any): void }

export class SearchResult {
  public objectId: string;
  public active: boolean;
  public name: string;
  public kind: string;
  public result: any;
  public component: any;
  
  constructor(public data: any) {
    this.objectId = data.objectId;
    this.active = false;
    this.name = this.computeName();
  }

  static newFromResult(result) {
    if (result.function) {
      // eslint-disable-next-line no-use-before-define
      return new FunctionSearchResult(result);
    } else if (result.verb) {
      // eslint-disable-next-line no-use-before-define
      return new VerbSearchResult(result);
    }
    throw new Error('Invalid result type.');
  }

  computeName(): string {
    throw new Error('Must be subclassed.');
  }

  // FIXME Inappropriate name
  openEditor(socketService: SocketService, fn: editorCallback) {
    throw new Error('Must be subclassed.');
  }
}

class FunctionSearchResult extends SearchResult {
  constructor(public data: any) {
    super(data);
    this.kind = "function";
    this.component = FunctionEditorComponent;
  }

  computeName(): string {
    return `${this.objectId}.${this.data.function}`;
  }

  openEditor(socketService: SocketService, fn: editorCallback) {
    const params = { objectId: this.objectId, name: this.data.function };
    socketService.getFunction(params, data => {
      this.result = data;
      fn(this);
    });
  }
}

class VerbSearchResult extends SearchResult {
  constructor(public data: any) {
    super(data);
    this.kind = "verb";
    this.component = VerbEditorComponent;
  }
  
  computeName(): string {
    return `${this.objectId}.${this.data.verb}`;
  }

  openEditor(socketService: SocketService, fn: editorCallback) {
    const params = { objectId: this.objectId, name: this.data.verb };
    socketService.getVerb(params, data => {
      this.result = data;
      fn(this);
    });
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges {
  @ViewChild('input') inputElement: ElementRef;
  @ViewChildren('results') listElements;

  @Input() refocus: boolean;
  @Output() choice = new EventEmitter<string>();
  
  private search: string = '';
  private prevSearch: string = '';
  private results: any = [];
  private selectedIndex: number = 0;
  private scrollTo: number = 0;
   
  constructor(private socketService: SocketService, private renderer: Renderer) { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: any) {
    if (changes.refocus && changes.refocus.currentValue === true) {
      // Asynchronously refocus the input field,
      // to give a chance for Angular to first show the search box.
      setTimeout(() => {
        this.renderer.invokeElementMethod(this.inputElement.nativeElement, 'focus', []);
      }, 0);
    }
  }

  private onKeyDown(event: KeyboardEvent) {
    const key = event.keyCode;
    
    if (this.results.length === 0) {
      return;
    }
    
    switch (key) {
      case 13: { // Enter key
        if (this.selectedIndex <= this.results.length) {
          this.onClick(this.results[this.selectedIndex]);
        }
        return;
      }
      case 38: { // Up key
        if (this.selectedIndex > 0) {
          this.selectedIndex -= 1;;
        } else {
          this.selectedIndex = this.results.length - 1;
        }
        this.selectionIntoView();
        return;
      }
      case 40: { // Down key
        if (this.selectedIndex < this.results.length - 1) {
          this.selectedIndex += 1;
        } else {
          this.selectedIndex = 0;
        }
        this.selectionIntoView();
        return;
      }
    }
  }
  
  private onKeyUp(event: KeyboardEvent) {
    const key = event.keyCode;

    if (this.search != this.prevSearch) {
      // Input has changed, lookup for new results
      this.socketService.search(this.search, (results: any) => {
        this.results = results.map(result => SearchResult.newFromResult(result));
        this.prevSearch = this.search;
        this.selectedIndex = 0;
        this.selectionIntoView();
      });
    }
  }
  
  private onClick(selected: any) {
    selected.openEditor(this.socketService, (choice) => {
      this.choice.emit(choice);
    });
  }
  
  private selectionIntoView() {
    if (this.listElements) {
      let listArray = this.listElements.toArray();
      if (this.selectedIndex < listArray.length) {
        // Pass offset to slim scrollbar...
        this.scrollTo = listArray[this.selectedIndex].nativeElement.offsetTop
                        - 10 /* Small cosmetic offet */;
      }
    }
  }

}

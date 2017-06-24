import { Component, Output, EventEmitter, OnInit,
         Input, ViewChild, ViewChildren, ElementRef, Renderer, OnChanges } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

import { SocketService } from '../socket.service';
import { FunctionEditorComponent } from '../editors/function-editor.component';
import { TextEditorComponent } from '../editors/text-editor.component';
import { VerbEditorComponent } from '../editors/verb-editor.component';

// FIXME Put all definitions elswhere...

type editorCallback = (data: any) => void;

export class SearchResult {
  public objectId: string;
  public active: boolean;
  public name: string;
  public kind: string;
  public result: any;
  public component: any;

  static newFromResult(result) {
    if (result.function) {
      // eslint-disable-next-line no-use-before-define -- FIXME ng lint complains
      return new FunctionSearchResult(result);
    } else if (result.verb) {
      // eslint-disable-next-line no-use-before-define -- FIXME ng lint complains
      return new VerbSearchResult(result);
    } else if (result.text) {
      // eslint-disable-next-line no-use-before-define -- FIXME ng lint complains
      return new TextSearchResult(result);
    }
    throw new Error('Invalid result type.');
  }

  constructor(public data: any) {
    this.objectId = data.objectId;
    this.active = false;
    this.name = this.computeName();
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
    this.kind = 'function';
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

class TextSearchResult extends SearchResult {
  constructor(public data: any) {
    super(data);
    this.kind = 'text';
    this.component = TextEditorComponent;
  }

  computeName(): string {
    return `${this.objectId}.${this.data.text}`;
  }

  openEditor(socketService: SocketService, fn: editorCallback) {
    const params = { objectId: this.objectId, name: this.data.text };
    socketService.getText(params, data => {
      this.result = data;
      fn(this);
    });
  }
}

class VerbSearchResult extends SearchResult {
  constructor(public data: any) {
    super(data);
    this.kind = 'verb';
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

  public search = '';
  private prevSearch = '';
  private results: any = [];
  public selectedIndex = 0;
  public scrollTo = 0;

  constructor(private socketService: SocketService, private renderer: Renderer,
              private toasterService: ToasterService) { }

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

  public onKeyDown(event: KeyboardEvent) {
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
          this.selectedIndex -= 1; ;
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

  public onKeyUp(event: KeyboardEvent) {
    const key = event.keyCode;

    if (this.search !== this.prevSearch) {
      // Input has changed, lookup for new results
      this.socketService.search(this.search, (results: any) => {
        this.results = results.map(result => SearchResult.newFromResult(result));
        this.prevSearch = this.search;
        this.selectedIndex = 0;
        this.selectionIntoView();
      });
    }
  }

  public onClick(selected: any) {
    selected.openEditor(this.socketService, (choice) => {
      if (choice.result) {
        this.choice.emit(choice);
      } else {
        // Retrieval failed, server returned null
        this.toasterService.pop('error', 'Fetch error', `Cannot retrieve ${selected.name}`);
      }
    });
  }

  private selectionIntoView() {
    if (this.listElements) {
      const listArray = this.listElements.toArray();
      if (this.selectedIndex < listArray.length) {
        // Pass offset to slim scrollbar...
        this.scrollTo = listArray[this.selectedIndex].nativeElement.offsetTop
                        - 10 /* Small cosmetic offet */;
      }
    }
  }

}

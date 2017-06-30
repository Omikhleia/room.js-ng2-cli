import { Component, Output, EventEmitter, OnInit,
         Input, ViewChild, ViewChildren, ElementRef, Renderer, OnChanges } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

import { SocketService } from '../socket.service';

import { SearchResult } from './search.class';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges {
  @ViewChild('input') inputElement: ElementRef;
  @ViewChildren('results') listElements;

  @Input() refocus: boolean;
  @Output() choice = new EventEmitter<SearchResult>();

  public search = '';
  private prevSearch = '';
  private results: SearchResult[] = [];
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

  public onClick(selected: SearchResult) {
    selected.fetchResult(this.socketService).then(choice => {
      if (choice.result) {
        this.choice.emit(choice);
      } else {
        // Retrieval failed, server returned null
        this.toasterService.pop('error', 'Fetch error', `Cannot retrieve ${selected.name}`);
      }
    });
  }

  public onClose() {
    this.choice.emit(null);
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

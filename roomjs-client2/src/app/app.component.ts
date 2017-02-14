import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

import { SocketService, SessionEvent } from './socket.service';
import { SoundService } from './sound.service';
import { Tab, TabsService, TabsBodyComponent, TabsHeaderComponent } from './tabs/tabs';
 
import { SearchComponent, SearchResult } from './search/search.component';
 
import { ClientViewComponent} from './client-view/client-view.component';
import { FunctionEditorComponent } from './function-editor/function-editor.component';
import { VerbEditorComponent } from './verb-editor/verb-editor.component';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  providers:[ SoundService, SocketService, TabsService ],
  entryComponents: [ ClientViewComponent, FunctionEditorComponent, VerbEditorComponent, SearchComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy { 
  private serverUrl: string = environment.serverUrl;
  public tab: number = 1;
  private nbtabs: number = 0;

  private allowSearch: boolean = false;
  private searchBoxVisible: boolean = false;

  private subscription;

  public tabsData = [
    {title:'Client', content: ClientViewComponent, close: false }
  ];

  constructor(private socketService: SocketService, private tabs: TabsService) {
  }

  ngOnInit() {
    this.socketService.init(this.serverUrl);
    
    this.subscription = this.socketService.state$.subscribe( state => {
      // Close any pending dialog upon state change
      this.searchBoxVisible = false;
      
      // Allow search dialog in playing mode only
      if (state === SessionEvent.Playing) {
        this.allowSearch = true;
      } else {
        this.allowSearch = false;
      }
    });

    this.tabs.setTabs(this.tabsData);
    this.tabs.setCurrentTab(1);
    this.tabs.getCurrentTab((currentTab)=>{
      this.tab = currentTab;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Set global keydown handler for search box and tabs
  @HostListener('document:keydown', ['$event']) onKeyboardEvent(event: KeyboardEvent) {
    const key = event.keyCode;
    const meta = event.metaKey;
    const ctrl = event.ctrlKey;
    const pKey = key === 80;
    const sKey = key === 83;
    const escapeKey = key === 27;

    // On Escape key, ensure search box is not displayed
    if (escapeKey && this.searchBoxVisible) {
      this.searchBoxVisible = false;
    }

    // On Meta/Ctrl-p, if allowed, display search box
    if ((meta && pKey) || (ctrl && pKey)) {
      if (this.allowSearch === true) {
        this.searchBoxVisible = true;
      }
      // Prevent default handlers (e.g. standard Ctrl-p may be "Print")
      event.preventDefault();
    }

    // On Meta/Ctrl-s, pass event to active tab if search box is not on.
    if ((meta && sKey) || (ctrl && sKey)) {
      if (!this.searchBoxVisible) {
        this.tabs.eventForwardTab(this.tab, event);
      }
      // Prevent default handlers (e.g. standard Ctrl-s may be "Save Page")
      event.preventDefault();
    }
  }
      
  private onSearchResult(searchResult: SearchResult) {
    // Close search box upon result
    this.searchBoxVisible = false;
    // Add new tab
    this.tabs.addTab({
      title: searchResult.name, 
      content: searchResult.component,
      close: true,
      dirty: false,
      data: searchResult.result
    });
  }
  
}

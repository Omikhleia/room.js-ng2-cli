import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * Service for handling tabs
 */

@Injectable()
export class TabsService implements OnDestroy {
  // Observables
  private tabs: any = [];
  private tabsSubject = new Subject<any>();
  private observableTabs = this.tabsSubject.asObservable();

  private currentTab: number = 1;
  private currentTabSubject = new Subject<number>();
  private observableCurrentTab = this.currentTabSubject.asObservable();

  // Subscriptions
  private subscriptions = [];

  constructor() { }

  public setTabs(tabs) {
    this.tabs = tabs;
    this.tabsSubject.next(tabs);
  }  

  public addTab(tab) {
    this.tabs.push(tab);
    // IMPORTANT: Some component may not initialize/render properly when not visible
    // (notably Codemirror). Therefore, always make the new tab current.
    this.setCurrentTab(this.tabs.length);
    this.tabsSubject.next(this.tabs);
  }

  public getTabs(fn) {
    let sub = this.observableTabs.subscribe(fn);
    this.subscriptions.push(sub);
  }

  public setCurrentTab(index: number) {
    this.currentTab = index;
    this.currentTabSubject.next(index);
  }

  public getCurrentTab(fn) {
    let sub = this.observableCurrentTab.subscribe(fn);
    this.subscriptions.push(sub);
  }
  
  public setDirty(index: number, dirty: boolean) {
    this.tabs[index].dirty = dirty;
    this.tabsSubject.next(this.tabs);
  }
  
  public closeTab(index) {
    // Assumption: never remove the first tab...     
    if (index !== 1) {
      if (this.canCloseTab(index - 1)) {
        this.setCurrentTab(index - 1);
        this.tabs.splice(index - 1, 1);
        this.tabsSubject.next(this.tabs);
      }
    }
  }
  
  private canCloseTab(index: number) {
    const msg = [
      'Are you sure you want to close this tab?',
      'You have unsaved changes that will be lost.',
    ].join(' ');

    return (this.tabs[index].dirty)
      // eslint-disable-next-line no-alert
      ? confirm(msg) // FIXME later have our own widget
      : true;
  }

  ngOnDestroy() {
    // Clean-up subscriptions
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }

}

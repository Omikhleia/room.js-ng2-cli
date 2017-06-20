import { Component } from '@angular/core';

import { TabsService } from './tabs.service';
import { Tab } from './tabs.model';

/**
 * Tabs header bar.
 * Each tab chas a name, and may be selected.
 * It also has an optional close button, and in that case a 'dirty' indicator.
 */
@Component({
  selector: 'app-tabs-header',
  templateUrl: './tabs-header.component.html',
  styleUrls: ['./tabs-header.component.css']
})
export class TabsHeaderComponent {
  private tabsData: Tab[] = [];
  public currentTab = 1;

  constructor(private tabs: TabsService) {
     // Subscribe to changes to the list of tabs and the selected tab
    this.tabs.getTabs((data: Tab[]) => {
      this.tabsData = data;
    });
    this.tabs.getCurrentTab((tab: number) => {
      this.currentTab = tab;
    });
  }

  public selectTab(index: number) {
    this.tabs.setCurrentTab(index);
  }

  public closeTab(index: number) {
    this.tabs.closeTab(index);
  }
}

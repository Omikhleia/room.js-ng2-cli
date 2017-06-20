import { Component } from '@angular/core';

import { TabsService } from './tabs.service';
import { Tab } from './tabs.model';

/**
 * Tabs bodies
 */

@Component({
  selector: 'app-tabs-body',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsBodyComponent {
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

}

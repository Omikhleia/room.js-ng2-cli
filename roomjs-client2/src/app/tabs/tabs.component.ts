import { Component } from '@angular/core';

import { TabsService } from './tabs.service';

/**
 * Tabs bodies
 */

@Component({
  selector: 'tabs-body',
  templateUrl: './tabs.component.html',
  styleUrls:['./tabs.component.css'],
})
export class TabsBodyComponent {
  private tabsData: any = [];
  private currentTab: number = 1;

  constructor(private tabs: TabsService){
    // Subscribe to changes to the list of tabs and the selected tab
    this.tabs.getTabs((data) => {
      this.tabsData = data;
    });
    this.tabs.getCurrentTab((tab) => {
      this.currentTab = tab;
    });
  }

}

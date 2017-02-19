import { Component, Input, OnInit, OnChanges,
         state, trigger, transition, style, animate, keyframes } from '@angular/core';

const items = {
  'empty mug': 'mug_empty.png',
  'empty cup': 'cup_empty.png',
  'empty glass': 'glass_empty.png',
  'mug of ale': 'mug_ale.png',
  'glass of wine': 'glass_full.png',
  'cup of tea': 'cup_full.png',
  'stick of bread': 'bread.png',
  'grilled lamb chop': 'lamb.png',
  'grilled pork tenderloin': 'pork.png',
  'staff of creation': 'staff.png',
  'antique key': 'key.png',
  'lantern': 'lantern.png'
};

const unknownItem = 'unknown_item.png';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  animations: [
    trigger('statusChanged', [
      state('stable' , style({ color: 'black' })),
      state('changed', style({ color: 'blue' })),
      transition('stable => changed',
        animate(300, keyframes([
          style({color: 'black', offset: 0}),
          style({color: 'red',  offset: 0.5}),
          style({color: 'blue', offset: 1.0})
        ]))),
      transition('changed => stable', animate('300ms')),
    ])
  ]
})
export class InventoryComponent implements OnInit {
  @Input() items: string[] = [];
  private visible: boolean = false;
  private isChanged: string = 'stable';

  constructor() { }

  ngOnInit() {
  }
  
  ngOnChanges(event: any) {
    // Trigger animation
    if (!this.visible) {
      this.isChanged = 'changed';
    }
    if (this.items.length === 0) {
      this.visible = false;
    }
  }
  
  private onClick(event : any) {
    this.visible = !this.visible;
    this.isChanged = 'stable';
  }
  
  private onDrop(event: any, item: string) {
    console.log("DROP " + event.dragData + " onto " + item);
    // FIXME DO SOME ACTION
  }
  
  private itemImage(item: string) {
    const prefix = './assets/images/items/';
    if (items[item]) {
      return prefix + items[item];
    }
    return prefix + unknownItem;
  }

}

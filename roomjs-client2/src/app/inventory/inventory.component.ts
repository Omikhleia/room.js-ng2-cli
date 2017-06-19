import { Component, Input, OnInit, OnChanges, HostListener,
         state, trigger, transition, style, animate, keyframes } from '@angular/core';
import { SocketService } from '../socket.service';

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
  'lantern': 'lantern.png',
  'pocket watch': 'pocketwatch.png'
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
  
  @HostListener('document:keydown', ['$event']) onKeyboardEvent(event: KeyboardEvent) {
    const key = event.keyCode;
    const escapeKey = key === 27;

    if (escapeKey) {
      this.visible = false;
    }
  }

  constructor(private socketService: SocketService) { }

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
  
  private onClose(event : any) {
    this.visible = false;
  }
  
  private onActivate(item: string) {
    this.socketService.send(`@look ${item}`);
  }
  
  private allowDrop(item?: string) {
    // Don't drop an item on itself
    return (dragData: any) => dragData !== item;
  }
  
  private onDrop(event: any, item?: string) {
    if (item) {
      this.socketService.send(`@put ${event.dragData} into ${item}`);
    } else {
      this.socketService.send(`@get ${event.dragData}`);
    }
    // FIXME HIDE @ (specific logic) ?
  }
  
  private itemName(item: string) {
    return item.replace(/\.[0-9]+/, ''); // FIXME remove determiners...
  }
  
  private itemImage(item: string) {
    const it: string = item.replace(/\.[0-9]+/, ''); // FIXME remove determiners...
    const prefix = './assets/images/items/';
    if (items[it]) {
      return prefix + items[it];
    }
    return prefix + unknownItem;
  }

}

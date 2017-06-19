import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

// FIXME Refactor later (inheritance with inventory, etc.)
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
  'mouse': 'mouse.png',
  'table': 'table.png',
  'chest': 'chest.png',
  'oak tree': 'tree.png',
  'Adam Baker': 'npc_baker.png',
  'Paul Butcher': 'npc_butcher.png',
  'Sarah': 'npc_barmaid.png',
  'pocket watch': 'pocketwatch.png'
};

const unknownItem = 'unknown_item.png';

@Component({
  selector: 'app-room-contents',
  templateUrl: './room-contents.component.html',
  styleUrls: ['./room-contents.component.css']
})
export class RoomContentsComponent implements OnInit {
  @Input() items: string[] = [];

  constructor(private socketService: SocketService) { }

  ngOnInit() {
  }

  private onActivate(item: string) {
    this.socketService.send(`@look ${item}`);
  }

  private onDrop(event: any, item?: string) {
    if (item) {
      this.socketService.send(`@put ${event.dragData} into ${item}`);
    } else {
      this.socketService.send(`@drop ${event.dragData}`);
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

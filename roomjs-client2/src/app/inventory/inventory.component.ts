import { Component, Input, OnInit, OnChanges, HostListener,
         state, trigger, transition, style, animate, keyframes } from '@angular/core';
import { SocketService } from '../socket.service';
import { ImageService } from '../image.service';

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
export class InventoryComponent implements OnInit, OnChanges {
  @Input() items: string[] = [];
  public visible = false;
  public isChanged = 'stable';

  @HostListener('document:keydown', ['$event']) onKeyboardEvent(event: KeyboardEvent) {
    const key = event.keyCode;
    const escapeKey = key === 27;

    if (escapeKey) {
      this.visible = false;
    }
  }

  constructor(private socketService: SocketService,
              private imageService: ImageService) { }

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

  public onClick(event: any) {
    this.visible = !this.visible;
    this.isChanged = 'stable';
  }

  public onClose(event: any) {
    this.visible = false;
  }

  public onActivate(item: string) {
    this.socketService.send(`@look ${item}`);
  }

  public allowDrop(item?: string) {
    // Don't drop an item on itself
    return (dragData: any) => dragData !== item;
  }

  public onDrop(event: any, item?: string) {
    if (item) {
      this.socketService.send(`@put ${event.dragData} into ${item}`);
    } else {
      this.socketService.send(`@get ${event.dragData}`);
    }
    // FIXME HIDE @ (specific logic) ?
  }

  public itemName(item: string) {
    return item.replace(/\.[0-9]+/, ''); // FIXME remove determiners...
  }

  public itemImage(item: string) {
    const it: string = item.replace(/\.[0-9]+/, ''); // FIXME remove determiners...
    return this.imageService.getImage(it);
  }

}

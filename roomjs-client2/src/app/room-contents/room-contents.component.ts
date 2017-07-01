import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-room-contents',
  templateUrl: './room-contents.component.html',
  styleUrls: ['./room-contents.component.css']
})
export class RoomContentsComponent implements OnInit {
  @Input() items: string[] = [];

  constructor(private socketService: SocketService,
              private imageService: ImageService) { }

  ngOnInit() {
  }

  public onActivate(item: string) {
    this.socketService.send(`@look ${item}`);
  }

  public onDrop(event: any, item?: string) {
    if (item) {
      this.socketService.send(`@put ${event.dragData} into ${item}`);
    } else {
      this.socketService.send(`@drop ${event.dragData}`);
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

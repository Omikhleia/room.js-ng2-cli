/* tslint:disable:no-bitwise */
import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from '../socket.service';

/**
 * Component for displaying players present in the room.
 */

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  @Input() players: any[];
  @Input() room: string;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
  }

  public setPlayerFlag(flag: number): string {
    if (flag & 0x02) {
      // Programmer
      return '\u25CF';
    }
    return '\u25CB';
  }

  public isOnline(flag): boolean {
    return (flag & 0x01) !== 0;
  }

  public onDrop(event: any, name: string) {
    this.socketService.send(`@give ${event.dragData} to ${name}`);
    // FIXME HIDE @ (specific logic) ?
  }

}

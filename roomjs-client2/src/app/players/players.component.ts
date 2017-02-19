import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() { 
  }
  
  private setPlayerFlag(flag: number): string {
    if (flag & 0x02) {
      // Programmer
      return '\u25CF';
    }
    return '\u25CB';
  }
  
  private isOnline(flag): boolean {
    return (flag & 0x01) !== 0
  }
  
  private onDrop(event: any, name: string) {
    console.log("DROP " + event.dragData + " to " + name);
    // FIXME DO SOME ACTION
  }

}

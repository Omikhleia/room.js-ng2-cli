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
  @Input() players: string[];

  constructor() { }

  ngOnInit() { 
  }

}

import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  //close = new EventEmitter(); // FIXME Add close later
  command: EventEmitter<string> = new EventEmitter<string>();
	
  title: string = "User command";
  fields: Array<any> = [];

  constructor() { }

  ngOnInit() {
  }
  
  private onClicked(cmd: string) {
    // Emit command to subscribers
    this.command.next(cmd);
  }
}

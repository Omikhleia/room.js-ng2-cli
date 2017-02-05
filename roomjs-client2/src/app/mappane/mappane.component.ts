import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mappane',
  templateUrl: './mappane.component.html',
  styleUrls: ['./mappane.component.css']
})
export class MappaneComponent implements OnInit {
  // Bindings
  @Input() exits: string[];
  @Output() commandEntered = new EventEmitter<string>();

  private blocks: any = [
    {x: 200, y: 0, dir: 'northwest' },
    {x: 300, y: 50, dir: 'north' },
    {x: 400, y: 100, dir: 'northeast' },
    {x: 100, y: 50, dir: 'west' },
    {x: 200, y: 100, dir: 'up' },
    {x: 200, y: 100, dir: 'down' },
    {x: 300, y: 150, dir: 'east' },
    {x: 0, y: 100, dir: 'southwest' },
    {x: 100, y: 150, dir: 'south' },
    {x: 200, y: 200, dir: 'southeast' }
  ];
  
  private exitBlocks: any = {
    northwest: "wd.png",
    north: "nd.png",
    northeast: "nd.png",
    west: "wd.png",
    up: "ud.png",
    down: "dd.png",
    east: "ed.png",
    southwest: "sd.png",
    south: "sd.png",
    southeast: "sd.png"
  };

 private doors: any = [  
    {x: 150, y: 125, dir: 'northwest' },
    {x: 350, y: 175, dir: 'north' },
    {x: 450, y: 225, dir: 'northeast' },
    {x: 50, y: 175, dir: 'west' },
    {x: 175, y: 237.5, dir: 'up' },
    {x: 220, y: 275, dir: 'down' },
    {x: 350, y: 325, dir: 'east' },
    {x: -50, y: 275, dir: 'southwest' },
    {x: 50, y: 325, dir: 'south' },
    {x: 250, y: 375, dir: 'southeast' }
 ];
    
  // Constructor  
  constructor() { }

  ngOnInit() {
  }
  
  // Event handlers
  private onClick(event: any) {
    // Check for command
    let hash;
    if (event.target.hash) {
      // HTML regular <a>
      hash = event.target.hash;
    } else if (event.target.hasAttribute('xlink:href')) {
      // SVG element with link
      hash = event.target.getAttribute('xlink:href');
    } else if (event.target.parentElement.hasAttribute('xlink:href')) {
      // SVG element with parent link (e.g. surrounded with a SVG <a>
      hash = event.target.parentElement.getAttribute('xlink:href');
    }
    
    const pattern = /#cmd\[(.*?)\]/g;
    const match = pattern.exec(hash);
    if (!match) { 
      return true; 
    }
    
    // URI-encoded on some browsers (e.g. Firefox), so ensure decoding
    // Prefix with @ for direct playmode command
    const command = '@' + decodeURIComponent(match[1]);
    
    // Send command
    this.commandEntered.next(command);
    
    // Prevent default link handlers
    event.preventDefault();
    return false;
  }
  
  // Private methods
  private hasDir(dir: string) {
    if (this.exits && this.exits.indexOf(dir) !== -1) {
      return true;
    }
    return false;
  }
  
  private dirImage(dir: string): string {
    const prefix = './assets/images/';
    return prefix + this.exitBlocks[dir];
  }
  
  private dirCommand(dir: string): string {
    return `#cmd[${dir}]`;
  }

}

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

  // ['north', 'northeast', 'northwest', 'west', 'up', 'down', 'east',
  //  'southwest', 'south', 'southeast']

  public blocks: any = [
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

  public exitBlocks: any = {
    northwest: 'nwdoor.png',
    north: 'ndoor.png',
    northeast: 'nedoor.png',
    west: 'wdoor.png',
    up: 'ustair.png',
    down: 'dstair.png',
    east: 'edoor.png',
    southwest: 'swdoor.png',
    south: 'sdoor.png',
    southeast: 'sedoor.png'
  };

  public wallBlocks: any = {
    northwest: 'nwwall.png',
    north: 'nwall.png',
    northeast: 'newall.png',
    west: 'wwall.png',
    east: 'ewall.png',
    southwest: 'swwall.png',
    south: 'swall.png',
    southeast: 'sewall.png'
  };

  public doors: any = [
    {x: 200, y: 150, dir: 'northwest' },
    {x: 325, y: 187.5, dir: 'north' },
    {x: 425, y: 262.5, dir: 'northeast' },
    {x: 75, y: 187.5, dir: 'west' },
    {x: 175, y: 237.5, dir: 'up' },
    {x: 220, y: 275.5, dir: 'down' },
    {x: 325, y: 312.5, dir: 'east' },
    {x: -25, y: 262.5, dir: 'southwest' },
    {x: 75, y: 312.5, dir: 'south' },
    {x: 200, y: 350, dir: 'southeast' }
  ];

  // Constructor
  constructor() { }

  ngOnInit() {
  }

  // Event handlers
  public onClick(event: any) {
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
  public hasDir(dir: string) {
    if (this.exits && this.exits.indexOf(dir) !== -1) {
      return true;
    }
    return false;
  }

  public hasWall(dir: string) {
    if (this.wallBlocks[dir]) {
      return true;
    }
    return false;
  }

  public dirImage(dir: string): string {
    const prefix = './assets/images/';
    return prefix + this.exitBlocks[dir];
  }
  public dirWall(dir: string): string {
    const prefix = './assets/images/';
    return prefix + this.wallBlocks[dir];
  }

  public dirCommand(dir: string): string {
    return `#cmd[${dir}]`;
  }

  public onDrop(event: any, target: string) {
    // UNUSED AS OF YET
    // No draggable with that droppable zone
    // "DROP " + event.dragData + " TO " + target;
    // FIXME DO SOME ACTION
  }

}

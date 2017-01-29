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
    const command = match[1];
    
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

}

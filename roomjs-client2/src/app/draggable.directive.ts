import { Directive, Input, ElementRef, HostListener, OnInit } from '@angular/core';
/*
 * Modified version from https://github.com/cedvdb/ng2draggable
 * - Constrain moved div within parent bounds.
 */

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {
  private topStart: number;
  private leftStart: number;
  private _allowDrag: boolean = true;
  private md: boolean;
  private _handle: HTMLElement;
  private _area: HTMLElement;

  constructor(public element: ElementRef) {
    this._area = element.nativeElement.parentElement;
  }

  ngOnInit(){
    // css changes
    if(this._allowDrag){
      this.element.nativeElement.style.position = 'absolute';
      this.element.nativeElement.className += ' cursor-draggable';
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event:MouseEvent) {
    if(event.button === 2 || (this._handle !== undefined && event.target !== this._handle))
      return; // prevents right click drag, remove his if you don't want it
    this.md = true;
    this.topStart = event.clientY - this.element.nativeElement.offsetTop;
    this.leftStart = event.clientX - this.element.nativeElement.offsetLeft;
  }

  @HostListener('document:mouseup', [ '$event' ])
  onMouseUp(event:MouseEvent) {
    this.md = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event:MouseEvent) {
    if( this.md && this._allowDrag ){
      this.doMove(event.clientY - this.topStart,
                  event.clientX - this.leftStart);
    }
  }

  @HostListener('document:mouseleave', ['$event'])
  onMouseLeave(event:MouseEvent) {
    this.md = false;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event:TouchEvent) {
    this.md = true;
    this.topStart = event.changedTouches[0].clientY - this.element.nativeElement.offsetTop;
    this.leftStart = event.changedTouches[0].clientX - this.element.nativeElement.offsetLeft;
    event.stopPropagation();
  }

  @HostListener('document:touchend', [ '$event' ])
  onTouchEnd() {
    this.md = false;
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event:TouchEvent) {
    if(this.md && this._allowDrag){
      this.doMove(event.changedTouches[0].clientY - this.topStart,
                  event.changedTouches[0].clientX - this.leftStart);
    }
    event.stopPropagation();
  }
  
  private doMove(top, left) {
    if ((!this._area) || (this._area.clientTop < top)) {
    }
    if (this._area) {
       const minTop = this._area.clientTop;
       const maxTop = this.element.nativeElement.clientHeight; // Tricky
       top = top > minTop ? top : minTop;
       top = top < maxTop ? top : maxTop;
       
       const minLeft = this._area.clientLeft;
       const maxLeft = this._area.clientLeft + this._area.clientWidth
                       - this.element.nativeElement.clientWidth;
       left = left > minLeft ? left : minLeft;
       left = left < maxLeft ? left : maxLeft;
    }
    this.element.nativeElement.style.top = top + 'px';
    this.element.nativeElement.style.left = left + 'px';
  }

  @Input('ng2-draggable')
  set allowDrag(value:boolean){
    this._allowDrag = value;
    if(this._allowDrag)
      this.element.nativeElement.className += ' cursor-draggable';
    else
      this.element.nativeElement.className = this.element.nativeElement.className
                                                  .replace(' cursor-draggable','');
  }

  @Input() 
  set appDraggableHandle(handle: HTMLElement){
    this._handle = handle;
  }
  
  @Input() 
  set appDragArea(handle: HTMLElement){
    this._area = handle;
  }
}

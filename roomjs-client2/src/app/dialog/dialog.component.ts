import { Component, OnInit, AfterViewInit,
         /* EventEmitter, */ ViewChild, ElementRef, Renderer } from '@angular/core';
import { NgForm } from '@angular/forms';

/**
 * Dialog modal popup with input fields.
 */

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, AfterViewInit {
  @ViewChild('focus') inputElement: ElementRef;

  // close = new EventEmitter(); // FIXME Add close later

  title = 'User input';
  fields: Array<any> = [];
  callback: any = null;

  constructor(private renderer: Renderer) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Asynchronously refocus the input field,
    // to give a chance for Angular to first show the dialog.
    setTimeout(() => {
      if (this.inputElement) {
        this.renderer.invokeElementMethod(this.inputElement.nativeElement, 'focus', []);
      }
    }, 0);
  }

  public titleCase(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  public onSubmit(form: NgForm) {
    // Invoke callback
    if (this.callback) {
      this.callback(form.value);
    }
  }

}

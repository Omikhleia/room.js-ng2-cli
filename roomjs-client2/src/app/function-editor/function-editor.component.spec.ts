/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule }   from '@angular/forms';
import { CodemirrorModule } from 'ng2-codemirror-typescript/Codemirror';

import { SocketService } from '../socket.service';
import { FunctionEditorComponent } from './function-editor.component';

describe('FunctionEditorComponent', () => {
  let component: FunctionEditorComponent;
  let fixture: ComponentFixture<FunctionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionEditorComponent ],
      imports: [ FormsModule, CodemirrorModule ],
      providers: [ SocketService ] // FIXME replace with mock-up for better testing      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

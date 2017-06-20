/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from 'ng2-codemirror-typescript/Codemirror';

import { SocketService } from '../socket.service';
import { VerbEditorComponent } from './verb-editor.component';

describe('VerbEditorComponent', () => {
  let component: VerbEditorComponent;
  let fixture: ComponentFixture<VerbEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbEditorComponent ],
      imports: [ FormsModule, CodemirrorModule ],
      providers: [ SocketService ] // FIXME replace with mock-up for better testing
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbEditorComponent);
    component = fixture.componentInstance;
    // TEST INPUT
    component.data = {
      verb: {
        name: 'myVerb',
        code: 'function () {}',
        pattern: 'verb',
        dobjarg: 'any',
        iobjarg: 'any',
        preparg: 'any'
      },
      objectId: 'fakeId'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DndModule } from 'ng2-dnd';

import { SocketService } from '../socket.service';

import { RoomContentsComponent } from './room-contents.component';

describe('RoomContentsComponent', () => {
  let component: RoomContentsComponent;
  let fixture: ComponentFixture<RoomContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomContentsComponent ],
      imports: [
        DndModule.forRoot()
      ],
      providers: [ SocketService ] // FIXME replace with mock-up for better testing
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DndModule } from 'ng2-dnd';

import { DraggableDirective } from '../draggable.directive';

import { MappaneComponent } from './mappane.component';

describe('MappaneComponent', () => {
  let component: MappaneComponent;
  let fixture: ComponentFixture<MappaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraggableDirective, MappaneComponent ],
      imports: [
        DndModule.forRoot()
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

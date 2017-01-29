/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MappaneComponent } from './mappane.component';

describe('MappaneComponent', () => {
  let component: MappaneComponent;
  let fixture: ComponentFixture<MappaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappaneComponent ]
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

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TextpaneComponent } from './textpane.component';
import { TextService } from '../text.service';

describe('TextpaneComponent', () => {
  let component: TextpaneComponent;
  let fixture: ComponentFixture<TextpaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextpaneComponent ],
      providers: [ TextService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextpaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

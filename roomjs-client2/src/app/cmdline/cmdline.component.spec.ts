/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CmdlineComponent } from './cmdline.component';

describe('CmdlineComponent', () => {
  let component: CmdlineComponent;
  let fixture: ComponentFixture<CmdlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmdlineComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmdlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

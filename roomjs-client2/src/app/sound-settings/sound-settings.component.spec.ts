/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { SoundService } from '../sound.service';
import { SoundSettingsComponent } from './sound-settings.component';

describe('SoundSettingsComponent', () => {
  let component: SoundSettingsComponent;
  let fixture: ComponentFixture<SoundSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundSettingsComponent ],
      imports: [ FormsModule ],
      providers: [ SoundService ] // FIXME replace with mock-up for better testing
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

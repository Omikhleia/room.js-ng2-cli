/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { DialogAnchorDirective } from './dialoganchor.directive';
import { SlimScroll } from './slimscroll.directive';

import { DialogComponent } from './dialog/dialog.component';
import { ButtonsComponent } from './buttons/buttons.component';

import { TextpaneComponent } from './textpane/textpane.component';
import { PlayersComponent } from './players/players.component';
import { CmdlineComponent } from './cmdline/cmdline.component';
import { MappaneComponent } from './mappane/mappane.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DialogAnchorDirective,
        DialogComponent,
        ButtonsComponent,
        TextpaneComponent,
        SlimScroll,
        PlayersComponent,
        CmdlineComponent,
        MappaneComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'app works!'`, async(() => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.debugElement.componentInstance;
    // expect(app.title).toEqual('app works!');
  // }));

  // it('should render title in a h1 tag', async(() => {
    // const fixture = TestBed.createComponent(AppComponent);
    // fixture.detectChanges();
    // const compiled = fixture.debugElement.nativeElement;
    // expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});

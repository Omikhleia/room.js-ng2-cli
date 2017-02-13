/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from 'ng2-codemirror-typescript/Codemirror';

import { DialogAnchorDirective } from './dialoganchor.directive';
import { SlimScroll } from './slimscroll.directive';

import { DialogComponent } from './dialog/dialog.component';
import { ButtonsComponent } from './buttons/buttons.component';

import { TextpaneComponent } from './textpane/textpane.component';
import { PlayersComponent } from './players/players.component';
import { CmdlineComponent } from './cmdline/cmdline.component';
import { MappaneComponent } from './mappane/mappane.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { TabDirective, TabsBodyComponent, TabsHeaderComponent } from './tabs/tabs';
import { FunctionEditorComponent } from './function-editor/function-editor.component';
import { SearchComponent } from './search/search.component';
import { VerbEditorComponent } from './verb-editor/verb-editor.component';
import { SoundSettingsComponent } from './sound-settings/sound-settings.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DialogAnchorDirective,
        DialogComponent,
        ButtonsComponent,
        TextpaneComponent,
        SlimScroll,
        PlayersComponent,
        CmdlineComponent,
        MappaneComponent,
        ClientViewComponent,
        TabDirective, 
        TabsBodyComponent, 
        TabsHeaderComponent, 
        FunctionEditorComponent, SearchComponent, 
        VerbEditorComponent, SoundSettingsComponent
      ],  
      imports: [
        FormsModule,
        CodemirrorModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'app works!'`, async(() => {
    // expect(app.title).toEqual('app works!');
  // }));

   it('should render title in a h1 tag', async(() => {
     const compiled = fixture.debugElement.nativeElement;
     expect(compiled.querySelector('h1').textContent).toContain('RoomJS angular2 client');
   }));
});

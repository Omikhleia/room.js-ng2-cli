/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from 'ng2-codemirror-typescript/Codemirror';
import { DndModule } from 'ng2-dnd';

import { DialogAnchorDirective } from './dialoganchor.directive';
import { SlimScrollDirective } from './slimscroll.directive';

import { DialogComponent } from './dialog/dialog.component';
import { ButtonsComponent } from './buttons/buttons.component';

import { TextpaneComponent } from './textpane/textpane.component';
import { PlayersComponent } from './players/players.component';
import { CmdlineComponent } from './cmdline/cmdline.component';
import { MappaneComponent } from './mappane/mappane.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { TabDirective, TabsBodyComponent, TabsHeaderComponent } from './tabs/tabs';
import { BaseEditorComponent } from './base-editor/base-editor.component';
import { FunctionEditorComponent } from './function-editor/function-editor.component';
import { VerbEditorComponent } from './verb-editor/verb-editor.component';
import { SearchComponent } from './search/search.component';
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
        SlimScrollDirective,
        PlayersComponent,
        CmdlineComponent,
        MappaneComponent,
        InventoryComponent,
        ClientViewComponent,
        TabDirective,
        TabsBodyComponent,
        TabsHeaderComponent,
        SearchComponent,
        BaseEditorComponent,
        FunctionEditorComponent,
        VerbEditorComponent,
        SoundSettingsComponent
      ],
      imports: [
        FormsModule,
        CodemirrorModule,
        DndModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('RoomJS angular2 client');
  });
});

/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodemirrorModule } from 'ng2-codemirror-typescript/Codemirror';
import { DndModule } from 'ng2-dnd';
import { ToasterModule } from 'angular2-toaster';

import { DialogAnchorDirective } from './dialoganchor.directive';
import { SlimScrollDirective } from './slimscroll.directive';
import { DraggableDirective } from './draggable.directive';

import { DialogComponent } from './dialog/dialog.component';
import { ButtonsComponent } from './buttons/buttons.component';

import { TextpaneComponent } from './textpane/textpane.component';
import { PlayersComponent } from './players/players.component';
import { CmdlineComponent } from './cmdline/cmdline.component';
import { MappaneComponent } from './mappane/mappane.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RoomContentsComponent } from './room-contents/room-contents.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { TabDirective, TabsBodyComponent, TabsHeaderComponent } from './tabs/tabs';
import { BaseEditorComponent } from './editors/base-editor.component';
import { FunctionEditorComponent } from './editors/function-editor.component';
import { TextEditorComponent } from './editors/text-editor.component';
import { VerbEditorComponent } from './editors/verb-editor.component';
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
        DraggableDirective,
        ButtonsComponent,
        TextpaneComponent,
        SlimScrollDirective,
        PlayersComponent,
        CmdlineComponent,
        MappaneComponent,
        InventoryComponent,
        RoomContentsComponent,
        ClientViewComponent,
        TabDirective,
        TabsBodyComponent,
        TabsHeaderComponent,
        SearchComponent,
        BaseEditorComponent,
        FunctionEditorComponent,
        TextEditorComponent,
        VerbEditorComponent,
        SoundSettingsComponent
      ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        CodemirrorModule,
        DndModule.forRoot(),
        ToasterModule
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

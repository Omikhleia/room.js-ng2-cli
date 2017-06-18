import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CodemirrorModule } from 'ng2-codemirror-typescript/Codemirror';
import { DndModule } from 'ng2-dnd';
import { Draggable } from 'ng2draggable/draggable.directive';

import { AppComponent } from './app.component';
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
import { SearchComponent } from './search/search.component';
import { BaseEditorComponent } from './base-editor/base-editor.component';
import { FunctionEditorComponent } from './function-editor/function-editor.component';
import { VerbEditorComponent } from './verb-editor/verb-editor.component';
import { SoundSettingsComponent } from './sound-settings/sound-settings.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RoomContentsComponent } from './room-contents/room-contents.component';

@NgModule({
  declarations: [
    Draggable,
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
    TabDirective, TabsBodyComponent, TabsHeaderComponent,
    SearchComponent, 
    BaseEditorComponent,
    FunctionEditorComponent,
    VerbEditorComponent,
    SoundSettingsComponent,
    InventoryComponent,
    RoomContentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CodemirrorModule,
    DndModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

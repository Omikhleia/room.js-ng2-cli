import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule } from 'angular2-toaster';

import { CodemirrorModule } from 'ng2-codemirror-typescript/Codemirror';
import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { DialogAnchorDirective } from './dialoganchor.directive';
import { SlimScrollDirective } from './slimscroll.directive';

import { DialogComponent } from './dialog/dialog.component';
import { ButtonsComponent } from './buttons/buttons.component';

import { TextpaneComponent } from './textpane/textpane.component';
import { PlayersComponent } from './players/players.component';
import { CmdlineComponent } from './cmdline/cmdline.component';
import { MappaneComponent } from './mappane/mappane.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { TabDirective, TabsBodyComponent, TabsHeaderComponent } from './tabs/tabs';
import { SearchComponent } from './search/search.component';
import { BaseEditorComponent } from './editors/base-editor.component';
import { FunctionEditorComponent } from './editors/function-editor.component';
import { TextEditorComponent } from './editors/text-editor.component';
import { VerbEditorComponent } from './editors/verb-editor.component';
import { SoundSettingsComponent } from './sound-settings/sound-settings.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RoomContentsComponent } from './room-contents/room-contents.component';
import { DraggableDirective } from './draggable.directive';

@NgModule({
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
    ClientViewComponent,
    TabDirective, TabsBodyComponent, TabsHeaderComponent,
    SearchComponent,
    BaseEditorComponent,
    FunctionEditorComponent,
    TextEditorComponent,
    VerbEditorComponent,
    SoundSettingsComponent,
    InventoryComponent,
    RoomContentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CodemirrorModule,
    DndModule.forRoot(),
    ToasterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

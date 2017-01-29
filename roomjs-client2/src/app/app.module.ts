import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CodemirrorModule } from 'ng2-codemirror-typescript/Codemirror';

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
import { FunctionEditorComponent } from './function-editor/function-editor.component';
import { SearchComponent } from './search/search.component';
import { VerbEditorComponent } from './verb-editor/verb-editor.component';

@NgModule({
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
    TabDirective, TabsBodyComponent, TabsHeaderComponent, FunctionEditorComponent, SearchComponent, VerbEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CodemirrorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

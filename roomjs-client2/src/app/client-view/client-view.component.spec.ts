/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { DndModule } from 'ng2-dnd';

import { DraggableDirective } from '../draggable.directive';

import { SocketService } from '../socket.service';
import { SoundService } from '../sound.service';

import { TextpaneComponent } from '../textpane/textpane.component';
import { PlayersComponent } from '../players/players.component';
import { CmdlineComponent } from '../cmdline/cmdline.component';
import { MappaneComponent } from '../mappane/mappane.component';
import { InventoryComponent } from '../inventory/inventory.component';
import { RoomContentsComponent } from '../room-contents/room-contents.component';

import { DialogComponent } from '../dialog/dialog.component';
import { ButtonsComponent } from '../buttons/buttons.component';
import { ClientViewComponent } from './client-view.component';

describe('ClientViewComponent', () => {
  let component: ClientViewComponent;
  let fixture: ComponentFixture<ClientViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DraggableDirective,
        DialogComponent, ButtonsComponent,
        TextpaneComponent, PlayersComponent, CmdlineComponent, MappaneComponent, InventoryComponent,
        RoomContentsComponent,
        ClientViewComponent
      ],
      imports: [ FormsModule, DndModule.forRoot() ],
      providers: [ SocketService, SoundService ] // FIXME replace with mock-up for better testing
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

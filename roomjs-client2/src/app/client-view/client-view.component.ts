import { Component, OnInit, OnDestroy, Input, ViewChild, ComponentRef,
         style, animate, transition, trigger } from '@angular/core';

import { SocketService, SessionEvent } from '../socket.service';
import { SoundService } from '../sound.service';
import { TextService } from '../text.service';

import { DialogComponent } from '../dialog/dialog.component';
import { ButtonsComponent } from '../buttons/buttons.component';
import { DialogAnchorDirective } from '../dialoganchor.directive';

import * as ansi_up from 'ansi_up';

@Component({
  selector: 'app-client-view',
  providers: [TextService],
  entryComponents: [ DialogComponent, ButtonsComponent ],
  animations: [
    trigger(
      'appearAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('500ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('500ms', style({opacity: 0}))
        ])
      ]
    )
  ],
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})
export class ClientViewComponent implements OnInit, OnDestroy {
  @ViewChild(DialogAnchorDirective) dialogAnchor: DialogAnchorDirective;

  public prompt = '';
  public players: any[] = [];
  public room = 'THE VOID';
  public exits: string[] = [];
  public inventory: string[] = [];
  public roomContents: string[] = [];
  private dialog: ComponentRef<any> = null;
  public showCmdLine = false;
  private subscriptions = [];

  constructor(private socketService: SocketService,
              private textService: TextService,
              private soundService: SoundService, ) {
  }

  ngOnInit() {
    let sub = this.socketService.input$.subscribe( expectedInputs => {
      this.dialog = this.dialogAnchor.createDialog(DialogComponent, expectedInputs);
    });
    this.subscriptions.push(sub);

    sub = this.socketService.text$.subscribe( message => {
      if (message && typeof message === 'object') {
        if (message.effect) {
          this.soundService.effect(message.effect);
        }
        if (message.ambiant) {
           this.soundService.ambiant(message.ambiant);
        }
        if (message.players) {
          this.players = message.players;
        }
        if (message.exits) {
          this.exits = message.exits;
        }
        if (message.room) {
          this.room = message.room;
        }
        if (message.inventory && message.contents) { // FIXME ugly, see dirtyDisambiguation...
          const dis = this.dirtyDisambiguation(message.inventory, message.contents);
          this.inventory = dis.inventory;
          this.roomContents = dis.contents;
        } else if (message.contents) {
          const dis = this.dirtyDisambiguation(this.inventory, message.contents);
          this.roomContents = dis.contents;
        } else if (message.inventory) {
          const dis = this.dirtyDisambiguation(message.inventory, this.roomContents);
          this.inventory = dis.inventory;
          this.roomContents = dis.contents;
        }
        message = message.text;
      }

      if (message !== undefined) {
        this.textService.send(message.toString());
      }
    });
    this.subscriptions.push(sub);

    sub = this.socketService.mode$.subscribe( mode => {
      this.prompt = ansi_up.ansi_to_html(mode, { use_classes: true });
    });
    this.subscriptions.push(sub);

    sub = this.socketService.state$.subscribe( state => {
      // Close any pending dialog upon state change
      if (this.dialog) {
        this.dialog.destroy();
        this.dialog = null;
      }

      this.showCmdLine = false;
      switch (state) {
        case SessionEvent.Disconnected:
            this.reset();
            // FIXME: Disable input from links?
            break;
        case SessionEvent.Connected:
            this.reset();
            this.loginOrCreate();
            break;
        case SessionEvent.Authenticated:
            this.reset();
            this.playOrCreate();
            break;
        default:
            // SessionEvent.Playing
            this.showCmdLine = true;
            break;
      }
    });
    this.subscriptions.push(sub);
  }

  private dirtyDisambiguation(oldInventory: string[], oldContents: string[]): any {
    // FIXME really dirty... Adding determiners for disambiguation
    const set = {};
    const renumbering: any = (item) => {
      item = item.replace(/\.[0-9]+/, '');
      if (!set[item]) {
        set[item] = 1;
      } else {
        set[item]++;
      }
      return item + '.' + set[item];
    };
    const inventory = oldInventory.map(renumbering);
    const contents = oldContents.map(renumbering);
    return { inventory, contents };
  }

  ngOnDestroy() {
    // Clean-up subscriptions
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private reset() {
    this.room = 'THE VOID';
    this.players = [];
    this.exits = [];
    this.inventory = [];
    this.roomContents = [];
    this.soundService.stop();
  }

  private playOrCreate() {
    this.dialog = this.dialogAnchor.createButtons(ButtonsComponent, {
      inputs: [
        {
          label: 'Create new character',
          name: 'create'
        },
        {
          label: 'Play...',
          name: 'play'
        },
        {
          label: 'Logout',
          name: 'logout'
        }
      ]
    });
    this.dialog.instance.command.subscribe((s: string) => {
      this.socketService.send(s);
    });
  }

  private loginOrCreate() {
    this.dialog = this.dialogAnchor.createButtons(ButtonsComponent, {
      inputs: [
        {
          label: 'Create new account',
          name: 'create'
        },
        {
          label: 'Login',
          name: 'login'
        }
      ]
    });
    this.dialog.instance.command.subscribe((s: string) => {
        this.socketService.send(s);
    });
  }

  public onCommand(event: any) {
    this.socketService.send(event);
  }

  public onModeChange(event: any) {
    this.socketService.changeMode(event);
  }
}

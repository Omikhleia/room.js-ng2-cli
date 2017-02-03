import { Component, OnInit, Input, ViewChild, ComponentRef,
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
export class ClientViewComponent implements OnInit {
  @ViewChild(DialogAnchorDirective) dialogAnchor: DialogAnchorDirective;
  
  private prompt: string = '';
  private players: string[] = [];
  private exits: string[] = [];
  private dialog: ComponentRef<any> = null;
  private showCmdLine: boolean = false;
  
  private someData:any={};
  private otherCompsData:any={}
   
  constructor(private socketService: SocketService, 
              private textService: TextService,
              private soundService: SoundService,) {
  }
     
  ngOnInit() {         
    this.socketService.input$.subscribe( expectedInputs => {
      this.dialog = this.dialogAnchor.createDialog(DialogComponent, expectedInputs);
    });
        
    this.socketService.text$.subscribe( message => {
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
        message = message.text;
      }
            
      if (message !== undefined) {
        this.textService.send(message.toString());
      }
    });
        
    this.socketService.mode$.subscribe( mode => {
      this.prompt = ansi_up.ansi_to_html(mode, { use_classes: true });
    });
              
    this.socketService.state$.subscribe( state => {
      // Close any pending dialog upon state change
      if (this.dialog) {
        this.dialog.destroy();
        this.dialog = null;
      }

      this.showCmdLine = false;
      switch(state) {
        case SessionEvent.Disconnected:
            this.players = [];
            this.exits = [];
            this.soundService.stop();
            // TODO DISABLE INPUT
            break;
        case SessionEvent.Connected:
            this.players = [];
            this.exits = [];
            this.soundService.stop();
            this.loginOrCreate();
            break;
        case SessionEvent.Authenticated:
            this.players = [];
            this.exits = [];
            this.soundService.stop();
            this.playOrCreate();
            break;
        default:
            // SessionEvent.Playing
            this.showCmdLine = true;
            break;
      }
    });
  }
    
  private playOrCreate() {
    this.dialog = this.dialogAnchor.createButtons(ButtonsComponent, {
      inputs: [
        {
          label: "Create new character",
          name: "create"
        },
        {
          label: "Play...",
          name: "play"
        },
        {
          label: "Logout",
          name: "logout"
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
          label: "Create new account",
          name: "create"
        },
        {
          label: "Login",
          name: "login"
        }            
      ]
    });
    this.dialog.instance.command.subscribe((s: string) => {
        this.socketService.send(s);
    });
  }
    
  private onCommand(event: any) {
    this.socketService.send(event);
  }

  private onModeChange(event: any) {
    this.socketService.changeMode(event);
  }
}

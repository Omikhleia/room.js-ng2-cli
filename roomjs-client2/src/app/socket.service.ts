import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as io from 'socket.io-client';

/**
 * Socket service module.
 * Abstract communication with the Room.js server.
 */

// FIXME REFACTOR State automata far form perfect, lots of any, etc.
export enum SessionEvent {
  Connected,
  Disconnected,
  Authenticated,
  Playing
}

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket;

  // Observable sources
  private textSubject = new Subject<any>();
  private modeSubject = new Subject<any>();
  private inputSubject = new Subject<any>();
  // Observable streams
  text$ = this.textSubject.asObservable();
  mode$ = this.modeSubject.asObservable();
  input$ = this.inputSubject.asObservable();

  private state = new BehaviorSubject<SessionEvent>(SessionEvent.Disconnected);
  state$ = this.state.asObservable();

  constructor() { }

  init(host: string) {
    const socketUrl = host;
    this.socket = io.connect(socketUrl);

    // SocketIO standard events
    this.socket.on('connect', this.onConnect.bind(this));
    this.socket.on('connecting', this.onConnecting.bind(this));
    this.socket.on('disconnect', this.onDisconnect.bind(this));
    this.socket.on('connect_error', this.onConnectError.bind(this));
    this.socket.on('connect_timeout', this.onConnectTimeout.bind(this));
    this.socket.on('error', this.onError.bind(this));
    this.socket.on('reconnect_failed', this.onReconnectFailed.bind(this));
    this.socket.on('reconnect', this.onReconnect.bind(this));
    this.socket.on('reconnecting', this.onReconnecting.bind(this));

    // RoomJS game engine events
    this.socket.on('output', this.onOutput.bind(this));
    this.socket.on('set-prompt', this.onSetPrompt.bind(this));
    this.socket.on('request-input', this.onRequestInput.bind(this));
    this.socket.on('login', this.onLogin.bind(this));
    this.socket.on('logout', this.onLogout.bind(this));
    this.socket.on('playing', this.onPlaying.bind(this));
    this.socket.on('quit', this.onQuit.bind(this));
  }

  send(command: string) {
    this.socket.emit('input', command);
  }

  changeMode(direction: number) {
    this.socket.emit('tab-key-press', { direction });
  }

  search(str: string, fn: any) {
    this.socket.emit('search', str, (results: any) => {
      fn(results);
    });
  }

  getVerb(params: any, fn: any) {
    this.socket.emit('get-verb', params, data => {
      fn(data);
    });
  }

  getText(params: any, fn: any) {
    this.socket.emit('get-text', params, data => {
      fn(data);
    });
  }

  getFunction(params: any, fn: any) {
    this.socket.emit('get-function', params, data => {
      fn(data);
    });
  }

  saveVerb(params: any, fn: any) {
    if (this.socket.disconnected) {
      fn('server disconnected');
    } else {
      this.socket.emit('save-verb', params, response => {
        fn(response);
      });
    }
  }

  saveText(params: any, fn: any) {
    if (this.socket.disconnected) {
      fn('server disconnected');
    } else {
      this.socket.emit('save-text', params, response => {
        fn(response);
      });
    }
  }

  saveFunction(params: any, fn: any) {
    if (this.socket.disconnected) {
      fn('server disconnected');
    } else {
      this.socket.emit('save-function', params, response => {
        fn(response);
      });
    }
  }

  // Private methods

  private onConnect() {
    this.addLine(/*boldGreen*/('Connected!'));
    this.state.next(SessionEvent.Connected);
  }

  private onConnecting() {
    this.addLine(/*gray*/('Connecting...'));
  }

  private onDisconnect() {
    this.addLine(/*boldRed*/('Disconnected from server.'));
    this.state.next(SessionEvent.Disconnected);
  }

  private onConnectError() {
    this.addLine(/*boldRed*/('Connection to server failed.'));
  }

  private onConnectTimeout() {
    this.addLine(/*boldRed*/('Connection to server timed-out.'));
  }

  private onError() {
    this.addLine(/*boldRed*/('An unknown error occurred.'));
  }

  private onReconnectFailed() {
    this.addLine(/*boldRed*/('Unable to reconnect to server.'));
  }

  private onReconnect() {
    this.addLine(/*boldGreen*/('Reconnected!'));
    this.state.next(SessionEvent.Connected);
  }

  private onReconnecting() {
    this.addLine(/*boldGreen*/('Reconnecting...'));
  }

  private onOutput(msg: any) {
    if (msg && msg.toString) {
      this.addLine(msg);
    }

    if (this.state.getValue() !== SessionEvent.Playing) {
        // FIXME
        if ((msg.search(/Invalid/) !== -1)
            || (msg.search(/Passwords did not match/) !== -1)
            || (msg.search(/Sorry/) !== -1)
            || (msg.search(/You have no character/) !== -1)
            || (msg.search(/Character created/) !== -1)
            ) {
            // Reissue current state - Should be handled in game engine FIXME
            this.state.next(this.state.getValue());
        }
    }
    // FIXED in upstream game engine.
    /* else if (msg.toString().search(/from another login session/) !== -1) {
          // Game engine kicks player out without notifying Quit FIXME
          //this.state.next(SessionEvent.Authenticated);
    } */
  }

  private onSetPrompt(str: string) {
    this.modeSubject.next(str);
  }

  private onLogin() {
    this.state.next(SessionEvent.Authenticated);
  }

  private onLogout() {
    this.state.next(SessionEvent.Connected);
  }

  private onPlaying() {
    this.state.next(SessionEvent.Playing);
  }

  private onQuit() {
    this.state.next(SessionEvent.Authenticated);
  }

  private onRequestInput(inputs: any, fn: any) {
    this.inputSubject.next({ inputs, fn });
  }

  private addLine(s: any) {
    this.textSubject.next(s);
  }
}

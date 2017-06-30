import { Type, Component } from '@angular/core';
import { SocketService } from '../socket.service';
import { FunctionEditorComponent } from '../editors/function-editor.component';
import { TextEditorComponent } from '../editors/text-editor.component';
import { VerbEditorComponent } from '../editors/verb-editor.component';

export class SearchResult {
  public objectId: string;
  public active: boolean;
  public name: string;
  public kind: string;
  public result: any;
  public component: Type<Component>;

  public static newFromResult(result) {
    if (result.function) {
      // tslint:disable-next-line:no-use-before-declare
      return new FunctionSearchResult(result);
    } else if (result.verb) {
      // tslint:disable-next-line:no-use-before-declare
      return new VerbSearchResult(result);
    } else if (result.text) {
      // tslint:disable-next-line:no-use-before-declare
      return new TextSearchResult(result);
    }
    throw new Error('Invalid result type.');
  }

  constructor(public data: any) {
    this.objectId = data.objectId;
    this.active = false;
    this.name = this.computeName();
  }

  computeName(): string {
    throw new Error('Must be subclassed.');
  }

  fetchResult(socketService: SocketService): Promise<SearchResult> {
    throw new Error('Must be subclassed.');
  }
}

class FunctionSearchResult extends SearchResult {
  constructor(public data: any) {
    super(data);
    this.kind = 'function';
    this.component = FunctionEditorComponent;
  }

  computeName(): string {
    return `${this.objectId}.${this.data.function}`;
  }

  fetchResult(socketService: SocketService): Promise<SearchResult> {
    const params = { objectId: this.objectId, name: this.data.function };
    return socketService.getFunction(params).then(data => {
      this.result = data;
      return this;
    });
  }
}

class TextSearchResult extends SearchResult {
  constructor(public data: any) {
    super(data);
    this.kind = 'text';
    this.component = TextEditorComponent;
  }

  computeName(): string {
    return `${this.objectId}.${this.data.text}`;
  }

  fetchResult(socketService: SocketService): Promise<SearchResult> {
    const params = { objectId: this.objectId, name: this.data.text };
    return socketService.getText(params).then(data => {
      this.result = data;
      return this;
    });
  }
}

class VerbSearchResult extends SearchResult {
  constructor(public data: any) {
    super(data);
    this.kind = 'verb';
    this.component = VerbEditorComponent;
  }

  computeName(): string {
    return `${this.objectId}.${this.data.verb}`;
  }

  fetchResult(socketService: SocketService): Promise<SearchResult> {
    const params = { objectId: this.objectId, name: this.data.verb };
    return socketService.getVerb(params).then(data => {
      this.result = data;
      return this;
    });
  }
}

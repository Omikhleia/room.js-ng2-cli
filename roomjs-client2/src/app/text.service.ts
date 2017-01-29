import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs";
import { Subject }    from 'rxjs/Subject';

/**
 * At this stage, just a basic service emitting textual
 * content to be sent to subscriber.
 */

@Injectable()
export class TextService {
  private textSubject = new Subject<string>();
  public text$ = this.textSubject.asObservable();
  
  constructor() { }

  /**
   * Convenience method.
   * @param s   textual content
   */
  send(s : string) {
    this.textSubject.next(s);
  }
}

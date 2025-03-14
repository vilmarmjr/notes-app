import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShellService {
  private scrollSubject = new Subject<void>();
  public readonly scroll$ = this.scrollSubject.asObservable();

  nextScrollEvent() {
    this.scrollSubject.next();
  }
}

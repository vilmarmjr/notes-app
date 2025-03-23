import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';

export class DialogRef<R = unknown> {
  private afterClosedSubject = new Subject<R | undefined>();

  constructor(private overlayRef: OverlayRef) {}

  public close(result?: R) {
    this.overlayRef.dispose();
    this.afterClosedSubject.next(result);
    this.afterClosedSubject.complete();
  }

  public afterClosed(): Observable<R | undefined> {
    return this.afterClosedSubject.asObservable();
  }
}

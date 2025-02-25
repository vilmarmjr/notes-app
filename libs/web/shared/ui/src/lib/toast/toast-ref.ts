import { OverlayRef } from '@angular/cdk/overlay';

export class ToastRef {
  constructor(private _overlayRef: OverlayRef) {}

  close() {
    this._overlayRef.dispose();
  }
}

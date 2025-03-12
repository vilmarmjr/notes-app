import { OverlayRef } from '@angular/cdk/overlay';

export class ToastRef {
  constructor(private overlayRef: OverlayRef) {}

  close() {
    this.overlayRef.dispose();
  }
}

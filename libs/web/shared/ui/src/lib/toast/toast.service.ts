import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable, InjectionToken, Injector } from '@angular/core';
import { BreakpointService } from '../breakpoint/breakpoint.service';
import { ToastConfig } from './toast-config';
import { ToastRef } from './toast-ref';
import { ToastComponent } from './toast.component';

const DEFAULT_CONFIG: ToastConfig = {
  width: 'auto',
  timeout: 4000,
  extendedTimeout: 2000,
  type: 'success',
  content: 'Success!',
};

export const TOAST_CONFIG = new InjectionToken<ToastConfig>('TOAST_CONFIG');

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _overlay = inject(Overlay);
  private _toastRef: ToastRef | null = null;
  private _breakpointService = inject(BreakpointService);

  success(
    content: ToastConfig['content'],
    config: Partial<Omit<ToastConfig, 'text' | 'type'>> = {},
  ) {
    this._show({ ...DEFAULT_CONFIG, ...config, content, type: 'success' });
  }

  error(
    content: ToastConfig['content'],
    config: Partial<Omit<ToastConfig, 'text' | 'type'>> = {},
  ) {
    this._show({ ...DEFAULT_CONFIG, ...config, content, type: 'error' });
  }

  close() {
    if (!this._toastRef) return;

    this._toastRef.close();
    this._toastRef = null;
  }

  private _show(config: ToastConfig) {
    this.close();

    const overlayRef = this._overlay.create(this._getOverlayConfig(config));
    this._toastRef = new ToastRef(overlayRef);
    const portal = new ComponentPortal(
      ToastComponent,
      null,
      Injector.create({
        providers: [
          { provide: TOAST_CONFIG, useValue: config },
          { provide: ToastRef, useValue: this._toastRef },
        ],
      }),
    );
    overlayRef.attach(portal);
  }

  private _getOverlayConfig(config: ToastConfig): OverlayConfig {
    const positionStrategy = this._breakpointService.lg()
      ? this._overlay.position().global().right('60px').bottom('60px')
      : this._overlay.position().global().bottom('20px').centerHorizontally();
    return { positionStrategy, width: config.width, maxWidth: '90%' };
  }
}

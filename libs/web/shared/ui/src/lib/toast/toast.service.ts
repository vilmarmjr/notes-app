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
  private overlay = inject(Overlay);
  private toastRef: ToastRef | null = null;
  private breakpointService = inject(BreakpointService);
  private injector = inject(Injector);

  success(
    content: ToastConfig['content'],
    config: Partial<Omit<ToastConfig, 'text' | 'type'>> = {},
  ) {
    this.show({ ...DEFAULT_CONFIG, ...config, content, type: 'success' });
  }

  error(
    content: ToastConfig['content'],
    config: Partial<Omit<ToastConfig, 'text' | 'type'>> = {},
  ) {
    this.show({ ...DEFAULT_CONFIG, ...config, content, type: 'error' });
  }

  close() {
    if (!this.toastRef) return;

    this.toastRef.close();
    this.toastRef = null;
  }

  private show(config: ToastConfig) {
    this.close();

    const overlayRef = this.overlay.create(this.getOverlayConfig(config));

    this.toastRef = new ToastRef(overlayRef);

    const toast = overlayRef.attach(
      new ComponentPortal(
        ToastComponent,
        null,
        Injector.create({
          providers: [
            { provide: TOAST_CONFIG, useValue: config },
            { provide: ToastRef, useValue: this.toastRef },
          ],
        }),
      ),
    ).instance;

    if (typeof config.content !== 'string') {
      toast.attachComponentPortal(
        new ComponentPortal(
          config.content,
          null,
          Injector.create({
            parent: this.injector,
            providers: [{ provide: ToastRef, useValue: this.toastRef }],
          }),
        ),
      );
    }
  }

  private getOverlayConfig(config: ToastConfig): OverlayConfig {
    const positionStrategy = this.breakpointService.lg()
      ? this.overlay.position().global().right('60px').bottom('60px')
      : this.overlay.position().global().bottom('20px').centerHorizontally();
    return { positionStrategy, width: config.width, maxWidth: '90%' };
  }
}

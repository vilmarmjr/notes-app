import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, TemplatePortal } from '@angular/cdk/portal';
import {
  inject,
  Injectable,
  Injector,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DialogRef } from './dialog-ref';
import { DialogConfig } from './dialog.config';
import { DIALOG_DATA } from './dialog.tokens';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private overlay = inject(Overlay);
  private injector = inject(Injector);

  open<C = unknown, D = unknown, R = unknown>(
    componentOrTemplate: ComponentType<C> | TemplateRef<unknown>,
    vcRef: ViewContainerRef,
    config?: DialogConfig<D>,
  ): DialogRef<R> {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      panelClass: [
        'bg-base-white',
        'rounded-xl',
        'dark:bg-neutral-700',
        'border',
        'border-neutral-200',
        'dark:border-neutral-600',
        'm-4',
      ],
      backdropClass: ['bg-neutral-950', '!opacity-50'],
      width: config?.width,
      height: config?.height,
      minWidth: config?.minWidth,
      minHeight: config?.minHeight,
      maxWidth: config?.maxWidth,
      maxHeight: config?.maxHeight,
    });
    const dialogRef = new DialogRef<R>(overlayRef);
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: config?.data },
      ],
    });
    const portal =
      componentOrTemplate instanceof TemplateRef
        ? new TemplatePortal(componentOrTemplate, vcRef, undefined, injector)
        : new ComponentPortal(componentOrTemplate, vcRef, injector);
    overlayRef.attach(portal);
    return dialogRef;
  }
}

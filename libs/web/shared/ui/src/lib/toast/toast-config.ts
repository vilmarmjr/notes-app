import { ComponentType } from '@angular/cdk/portal';

export type ToastConfig = {
  content: string | ComponentType<unknown>;
  type: 'success' | 'error';
  timeout: number;
  extendedTimeout: number;
  width: string | number;
};

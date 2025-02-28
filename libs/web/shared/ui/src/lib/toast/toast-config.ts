import { Type } from '@angular/core';

export type ToastConfig = {
  content: string | Type<unknown>;
  type: 'success' | 'error';
  timeout: number;
  extendedTimeout: number;
  width: string;
};

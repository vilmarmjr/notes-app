import { Type } from '@angular/core';

export type ToastConfig = {
  content: string | Type<unknown>;
  type: 'success' | 'error';
  hideDelay: number;
  minWidth: string;
};

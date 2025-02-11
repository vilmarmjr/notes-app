import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

// Tailwind breakpoints. See https://tailwindcss.com/docs/responsive-design
const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

@Injectable({ providedIn: 'root' })
export class BreakpointService {
  private _breakpointObserver = inject(BreakpointObserver);

  public readonly sm$ = this._matches('sm');
  public readonly md$ = this._matches('md');
  public readonly lg$ = this._matches('lg');
  public readonly xl$ = this._matches('xl');

  public readonly sm = toSignal(this.sm$);
  public readonly md = toSignal(this.md$);
  public readonly lg = toSignal(this.lg$);
  public readonly xl = toSignal(this.xl$);

  private _matches(breakpoint: Breakpoint) {
    return this._breakpointObserver
      .observe(`(min-width: ${BREAKPOINTS[breakpoint]})`)
      .pipe(map(({ matches }) => matches));
  }
}

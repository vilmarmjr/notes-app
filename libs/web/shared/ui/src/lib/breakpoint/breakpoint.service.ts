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
  private breakpointObserver = inject(BreakpointObserver);

  public readonly sm$ = this.matches('sm');
  public readonly md$ = this.matches('md');
  public readonly lg$ = this.matches('lg');
  public readonly xl$ = this.matches('xl');

  public readonly sm = toSignal(this.sm$, { requireSync: true });
  public readonly md = toSignal(this.md$, { requireSync: true });
  public readonly lg = toSignal(this.lg$, { requireSync: true });
  public readonly xl = toSignal(this.xl$, { requireSync: true });

  private matches(breakpoint: Breakpoint) {
    return this.breakpointObserver
      .observe(`(min-width: ${BREAKPOINTS[breakpoint]})`)
      .pipe(map(({ matches }) => matches));
  }
}

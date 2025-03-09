import { ActivatedRoute } from '@angular/router';

export function getRootRoute(route: ActivatedRoute) {
  if (route.firstChild) {
    return getRootRoute(route.firstChild);
  }
  return route;
}

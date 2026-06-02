import { RouteType } from '../type/type';

export const routeMap = new Map<string, RouteType>([
  ['/login', { type: 'guest' }],
  ['/registro', { type: 'guest' }],
  ['/recuperar-senha', { type: 'guest' }],
  ['/verificar-email', { type: 'guest' }],
  ['/nova-senha', { type: 'guest' }],
  ['/', { type: 'public' }],
  ['/docs', { type: 'public' }],
]);

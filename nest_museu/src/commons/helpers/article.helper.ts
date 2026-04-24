import { Gender } from '../type/fieldoptions.type';

export function article(gender: Gender = 'm'): string {
  return gender === 'f' ? 'A' : 'O';
}

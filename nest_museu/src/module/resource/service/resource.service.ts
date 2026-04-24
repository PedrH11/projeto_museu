import { Injectable } from '@nestjs/common';
import { Resources } from '../resources';

@Injectable()
export class ResourceService {
  findAll() {
    return Resources;
  }
}

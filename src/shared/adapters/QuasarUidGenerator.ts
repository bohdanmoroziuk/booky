/* eslint-disable class-methods-use-this */

import { uid } from 'quasar';

import { UidGenerator } from 'src/shared/ports';

export class QuasarUidGenerator implements UidGenerator {
  generate(): string {
    return uid();
  }
}

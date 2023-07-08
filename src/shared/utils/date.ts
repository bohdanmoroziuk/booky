import { date } from 'quasar';

export const toDisplayDate = (value: Date | string | number) => date.formatDate(value, 'DD MMM YYYY, HH:mm');

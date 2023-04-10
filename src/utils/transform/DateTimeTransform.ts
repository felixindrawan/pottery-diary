/* eslint-disable import/prefer-default-export */
import moment, { Moment } from 'moment';

/**
 * @param date - Moment or JS Date
 * @param separator - String separator, default value is -
 * @returns formatted moment/date by YY-MM-DD (eg. 12-29-23)
 */
export function formatMMDDYY(date?: Moment | Date, separator?: string): string {
  if (!date) return '';
  return moment(date).format(`MM${separator || '-'}DD${separator || '-'}YY`);
}

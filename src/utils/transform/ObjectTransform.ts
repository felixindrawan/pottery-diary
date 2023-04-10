/* eslint-disable import/prefer-default-export */
/**
 * Reverese object's key value paid
 * eg. `{ a: 1, b: 2 }` => { 1: 'a', 2: 'b' }
 * @param object - Key value pair
 * @returns reveresed key value pair of the object
 */
export function reverseObject<
  K extends string | number | symbol,
  T extends string | number | symbol,
>(object: Record<K, T>): { [V in T]: keyof T } {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => [value, key]));
}

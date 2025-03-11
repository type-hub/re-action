export function getKeys<T extends Record<string, any>>(
  o: T
): (keyof T & string)[] {
  return Object.keys(o);
}

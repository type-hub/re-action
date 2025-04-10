export const getKeys: <Obj extends Record<string, any>>(
  o: Obj,
) => (keyof Obj & string)[] = Object.keys

// support
// - for payload
// - and for simple functions

import { CreateAction, CreateActionCreators, Func } from "../../types";

function keys<T extends Record<string, any>>(o: T): (keyof T & string)[] {
  return Object.keys(o);
}

// VID: better way to create actions (redux, useReducer)
const setup = <Obj extends Record<string, Func>>(o: Obj) => {
  const _keys = keys(o);

  return _keys.reduce((acc, key) => {
    acc[key] = <T extends Parameters<Obj[typeof key]>>(
      ...payload: T
    ): CreateAction<T, typeof key> => ({
      payload: o[key](...payload),
      type: key,
    });

    return acc;
  }, {} as CreateActionCreators<Obj>);
};

const id = <T>(value: T): T => value;

/*

- action should build payload (use ramda chains)
-

*/

// VID: pre typed generic functions
export const x = setup({
  a: id,
  aa: id<string>,
  b: (a: number) => `a-${a}`,
  // b: <T extends number>(a: T): `a-${T}` => `a-${a}`,
  c: () => ({ a: 1 }),
  // ramda chain
});

// TS read const but not use it as generic
const f = x.aa("1");
//    ^?
const g = x.b("s");
//    ^?
const e = x.b(1);
//    ^?

const h = x.c();
//    ^?

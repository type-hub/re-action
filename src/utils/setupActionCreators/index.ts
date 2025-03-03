import { CreateAction, CreateActionCreators, Func } from "../../types";
import { keys } from "../keys";

const setup = <Obj extends Record<string, Func>>(
  o: Obj
): CreateActionCreators<Obj> => {
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

// TESTS

const id = <T>(value: T): T => value;

// TODO: rethink, action should build payload (use ramda chains)

const x = setup({
  a: id,
  // VID: pre typed generic functions
  aa: id<string>,
  b: (a: number) => `a-${a}`,
  // b: <T extends number>(a: T): `a-${T}` => `a-${a}`,
  c: () => ({ a: 1 }),
  // ramda chain
});

const f = x.aa("1");
//    ^?
const g = x.b(2);
//    ^?
const e = x.b(1);
//    ^?

const h = x.c();
//    ^?

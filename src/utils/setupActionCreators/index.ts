import {
  CreateAction,
  CreateActionCreatorsFromFnLookUp,
  FUNC_LOOKUP,
} from "../../types"
import { getKeys } from "../getKeys"

export const setupActionsCreators = <FL extends FUNC_LOOKUP>(
  funcLookup: FL,
): CreateActionCreatorsFromFnLookUp<FL> => {
  const _keys = getKeys(funcLookup)

  return _keys.reduce((acc, key) => {
    acc[key] = <
      In extends Parameters<FL[typeof key]>,
      Out extends ReturnType<FL[typeof key]>,
    >(
      ...payload: In
    ): CreateAction<Out, typeof key> => ({
      payload: funcLookup[key](...payload),
      type: key,
    })

    return acc
  }, {} as CreateActionCreatorsFromFnLookUp<FL>)
}

// --- TESTS --------------------------------------------------------

// const id = <T>(value: T): T => value;

// const x = setupActionsCreators({
//   a: id,
//   // VID: pre typed generic functions
//   aa: id<string>,
//   b: (a: number) => `a-${a}`,
//   // b: <T extends number>(a: T): `a-${T}` => `a-${a}`,
//   c: () => ({ a: 1 as const }),
//   // ramda chain
// });

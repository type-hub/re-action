import {
  CreateAction,
  CreateActionCreatorsFromFnLookUp,
  DeadTypeAdapter,
  FUNC_LOOKUP,
} from "../../types"
import { getKeys } from "../getKeys"

export type ResolvePrefix<
  ActionType extends string,
  Prefix extends string | undefined = string,
> =
  //
  [Prefix] extends [string]
    ? [string] extends [Prefix]
      ? ActionType
      : `${Prefix}/${ActionType}`
    : ActionType

export const setupActionsCreators = <
  FL extends FUNC_LOOKUP,
  Prefix extends string,
>(
  funcLookup: FL,
  prefix?: Prefix,
): CreateActionCreatorsFromFnLookUp<FL, Prefix> => {
  const _keys = getKeys(funcLookup)

  return _keys.reduce(
    (acc, key) => {
      type ActionType = ResolvePrefix<typeof key, Prefix>

      const resolveType = <P extends string | undefined, K extends string>(
        prefix: P,
        key: K,
      ) => {
        if (prefix) {
          return `${prefix}/${key}`
        }

        return key
      }

      function _actionCreator<
        In extends Parameters<FL[typeof key]>,
        Out extends ReturnType<FL[typeof key]>,
      >(...payload: DeadTypeAdapter<In>): CreateAction<ActionType, Out> {
        // TODO: resolve payload function
        if (payload.length === 0) {
          return {
            type: resolveType(prefix, key),
          } as CreateAction<ActionType, Out>
        } else {
          return {
            type: resolveType(prefix, key),
            payload: funcLookup[key](...payload),
          } as CreateAction<ActionType, Out>
        }
      }

      _actionCreator.match = (
        action: any,
      ): action is CreateAction<
        ResolvePrefix<typeof key, Prefix>,
        ReturnType<FL[typeof key]>
      > => action.type === resolveType(prefix, key)

      acc[key] = _actionCreator

      return acc
    },
    {} as CreateActionCreatorsFromFnLookUp<FL, Prefix>,
  )
}

// --- TESTS --------------------------------------------------------

// export const actionCreators = setupActionsCreators(
//   {
//     increment: (amount: number) => amount,
//     decrement: (amount: number) => amount,
//     optional: (newState?: string) => {},
//     reset: (newState?: string) => {},
//   },
//   "TEST" as const,
// )

// const testAction =
//   Math.random() > 0.5 ? { type: "reset" } : { type: "optional" }

// if (actionCreators.increment.match(testAction)) {
//   const x = testAction.payload
// }

// const z = actionCreators.reset()

// type State = { counter: number }

// type actions = GetActionTypes<typeof actionCreators>

// export const reducer = (
//   state: State,
//   action: GetActionTypes<typeof actionCreators>,
// ): State => {
//   if (actionCreators.increment.match(action)) {
//     return {
//       counter: state.counter + action.payload,
//     }
//   }
//   if (actionCreators.decrement.match(action)) {
//     return {
//       counter: state.counter - action.payload,
//     }
//   }

//   if (actionCreators.reset.match(action)) {
//     return {
//       counter: 0,
//     }
//   }

//   throw Error(`Unknown action: ${JSON.stringify(action)}`)
// }

// //////////

// const id = <T>(value: T): T => value

// const testActionCreators = setupActionsCreators({
//   a: id,
//   // VID: pre typed generic functions
//   aa: id<string>,
//   b: (a: number) => `a-${a}`,
//   // b: <T extends number>(a: T): `a-${T}` => `a-${a}`,
//   c: () => ({ a: 1 as const }),
//   // ramda chain
//   reset: () => {},
// })

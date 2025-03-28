// ==== General =============================================================

import { ResolvePrefix } from "../utils"

export type FUNC = (...args: any[]) => any
export type FUNC_LOOKUP = Record<string, FUNC>

// ==== Actions ============================================================

export type ACTION = { type: string; payload?: any }

export type CreateAction<Type extends string, Payload> = void extends Payload
  ? { type: Type }
  : { type: Type; payload: Payload }

type ActionCreator<A extends ACTION> = (...args: any[]) => A

export type ActionCreators<A extends ACTION> = Readonly<
  Record<string, ActionCreator<A>>
>

export type CreateActionCreatorFromFn<
  //
  Type extends string,
  Fn extends FUNC,
> = ((
  ...args: DeadTypeAdapter<Parameters<Fn>>
) => CreateAction<Type, ReturnType<Fn>>) & {
  match: (action: any) => action is CreateAction<Type, ReturnType<Fn>>
}

export type CreateActionCreatorsFromFnLookUp<
  Obj extends FUNC_LOOKUP,
  Prefix extends string,
> = {
  [K in keyof Obj]: CreateActionCreatorFromFn<
    //
    ResolvePrefix<K & string, Prefix>,
    Obj[K]
  >
}

// ==== Binded Actions ========================================================

export type DeadTypeAdapter<T> = T extends []
  ? [DEAD_TYPE_PLACE_HOLDER?: any]
  : T

export type CreateBindedActions<AC extends ActionCreators<ACTION>> = {
  [K in keyof AC]: (...args: DeadTypeAdapter<Parameters<AC[K]>>) => void
}

// ==== DisplayName ===========================================================

export type DISPLAY_NAME = string

// ==== Reducer ================================================================

export type Reducer<S, A extends ACTION> = (prevState: S, action: A) => S

//TODO: what is this?
type SuperGenericReducerSTRANGE = <S, A extends ACTION>(s: S, a: A) => S

// ==== Dispatch ================================================================

export type Dispatch<A extends ACTION> = (action: A) => void

export type CreateDispatchFromActionCreators<
  AC extends ActionCreators<ACTION>,
> = (action: GetActionTypes<AC>) => void

// ==== Public Utils =============================================================

export type GetActionTypes<AC extends ActionCreators<ACTION>> = ReturnType<
  AC[keyof AC]
>

// ==== General =============================================================

export type Func = (...args: any[]) => any;

// ==== Actions ============================================================

export type ACTION = { payload: any; type: string };
export type CreateAction<Payload, Type extends string> = {
  payload: Payload;
  type: Type;
};

type ActionCreator<A extends ACTION> = (...args: any[]) => A;

export type ActionCreators<A extends ACTION> = Readonly<
  Record<string, ActionCreator<A>>
>;

type CreateActionCreatorFromFn<
  //
  Fn extends Func,
  Type extends string
> = <Args extends Parameters<Fn>>(
  ...args: Args
) => CreateAction<ReturnType<Fn>, Type>;

export type CreateActionCreatorsFromFnLookUp<Obj extends Record<string, Func>> =
  {
    [K in keyof Obj]: CreateActionCreatorFromFn<Obj[K], K & string>;
  };

// ==== Binded Actions ========================================================

export type CreateBindedActions<AC extends ActionCreators<ACTION>> = {
  [K in keyof AC]: (...args: Parameters<AC[K]>) => void;
};

// ==== DisplayName ===========================================================

export type DisplayName = Capitalize<string>;
export type MaybeDisplayName = Capitalize<string> | undefined;

// ==== Reducer ================================================================

export type Reducer<S, A extends ACTION> = (prevState: S, action: A) => S;

//TODO: what is this?
type SuperGenericReducerSTRANGE = <S, A extends ACTION>(s: S, a: A) => S;

// ==== Dispatch ================================================================

export type Dispatch<A extends ACTION> = (action: A) => void;

export type CreateActionDispatch<AC extends ActionCreators<ACTION>> = (
  action: GetActionTypes<AC>
) => void;

// ==== Public Utils =============================================================

export type GetActionTypes<AC extends ActionCreators<ACTION>> = {
  [K in keyof AC]: ReturnType<AC[K]>;
}[keyof AC];

// --- General ---

export type Func = (...args: any[]) => any;

// --- Actions ---

type Action = { payload: any; type: string };
export type CreateAction<Payload, Type extends string> = {
  payload: Payload;
  type: Type;
};

// --- Actions ---

type ActionCreator = (...args: any[]) => Action;

export type ActionCreators = Readonly<Record<string, ActionCreator>>;

type CreateActionCreator<Fn extends Func, Type extends string> = <
  Args extends Parameters<Fn>
>(
  ...args: Args
) => CreateAction<Args, Type>;

export type CreateActionCreators<Obj extends ActionCreators> = {
  [K in keyof Obj]: CreateActionCreator<Obj[K], K & string>;
};

// --- Binded Actions ---

export type CreateBindedActions<AC extends ActionCreators> = {
  [K in keyof AC]: (...args: Parameters<AC[K]>) => void;
};

// --- DisplayName ---

export type DisplayName = Capitalize<string>;
export type MaybeDisplayName = Capitalize<string> | undefined;

// --- Reducer ---

export type CreateReducer<State, AC extends ActionCreators> = (
  prevState: State,
  action: GetActionTypes<AC>
) => State;

// --- Dispatch ---

export type CreateActionDispatch<AC extends ActionCreators> = (
  action: GetActionTypes<AC>
) => void;

// --- Public Utils ---

export type GetActionTypes<
  ActionsLookup extends Readonly<Record<string, (...args: any[]) => any>>
> = {
  [K in keyof ActionsLookup]: ReturnType<ActionsLookup[K]>;
}[keyof ActionsLookup];

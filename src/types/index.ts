export type Action = { payload: any; type: string };
export type CreateAction<Payload, Type extends string> = {
  payload: Payload;
  type: Type;
};

export type Func = (...args: any[]) => any;
export type ActionCreator = (...args: any[]) => { payload: any; type: string };

export type CreateActionCreator<Fn extends Func, Type extends string> = <
  Args extends Parameters<Fn>
>(
  ...args: Args
) => CreateAction<Args, Type>;

// TODO: do we need readonly here?
// TODO: no check for payload and type in output
export type ActionCreators = Readonly<Record<string, (...args: any[]) => any>>;

export type CreateActionCreators<Obj extends ActionCreators> = {
  [K in keyof Obj]: CreateActionCreator<Obj[K], K & string>;
};

export type ActionDispatch = React.Dispatch<any>;

export type GetActionTypes<
  ActionsLookup extends Readonly<Record<string, (...args: any[]) => any>>
> = {
  [K in keyof ActionsLookup]: ReturnType<ActionsLookup[K]>;
}[keyof ActionsLookup];

export type CreateActionDispatch<AC extends ActionCreators> = React.Dispatch<
  GetActionTypes<AC>
>;

export type CreateBindedActions<AC extends ActionCreators> = {
  [K in keyof AC]: (...args: Parameters<AC[K]>) => void;
};

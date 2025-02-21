export type ActionCreators = Readonly<Record<string, (...args: any[]) => any>>;

export type ActionDispatch = React.Dispatch<any>;

export type CreateActionDispatch<AC extends ActionCreators> = React.Dispatch<
  GetActionTypes<AC>
>;

export type CreateBindedActions<AC extends ActionCreators> = {
  [K in keyof AC]: (...args: Parameters<AC[K]>) => void;
};

export type GetActionTypes<
  ActionsLookup extends Readonly<Record<string, (...args: any[]) => any>>
> = {
  [K in keyof ActionsLookup]: ReturnType<ActionsLookup[K]>;
}[keyof ActionsLookup];

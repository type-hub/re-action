export type GetActionTypes<
  ActionsLookup extends Readonly<Record<string, (...args: any[]) => any>>
> = {
  [K in keyof ActionsLookup]: ReturnType<ActionsLookup[K]>;
}[keyof ActionsLookup];

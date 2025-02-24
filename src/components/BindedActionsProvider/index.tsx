import { createBindedReducerContext } from "../../creators/createBindedReducerContext";

type GenericProps<T> = {
  children: any;
  useTypedBindedActions: ReturnType<
    ReturnType<typeof createBindedReducerContext>
  >;
};

export const TODO = "TODO: solve types from return to dispatch";

// export const BindedActionsProvider = <T extends {}>({
//   children,
//   useTypedBindedActions,
// }: GenericProps<T>) => {
//   const x = useTypedBindedActions;
//   return <Provider>{children}</Provider>;
// };

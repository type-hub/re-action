import React, { createContext, memo, useContext } from "react";
import { DISPLAY_NAME } from "../../types";
import { ResolveDisplayName, resolveDisplayName } from "../resolveDisplayName";

export type CreateContextFactory<
  ContextValue,
  DN extends DISPLAY_NAME | undefined
> = {
  [K in `use${ResolveDisplayName<DN>}`]: () => ContextValue;
} & {
  [K in `${ResolveDisplayName<DN>}Provider`]: React.MemoExoticComponent<
    (props: { value: ContextValue; children: React.ReactNode }) => JSX.Element
  >;
};

export function contextFactory<
  ContextValue,
  DN extends DISPLAY_NAME | undefined = undefined
>(displayName?: DN): CreateContextFactory<ContextValue, DN> {
  const dn = resolveDisplayName(displayName);

  const Context = createContext<ContextValue | undefined>(undefined);
  Context.displayName = dn;

  function useContextValue(): ContextValue {
    const value = useContext(Context);

    if (value === undefined) {
      throw new Error(`${dn} must be used within a ${dn}Provider`);
    }

    return value;
  } // TODO: add debug name

  type ContextProviderProps = {
    value: ContextValue;
    children: React.ReactNode;
  };

  const ContextProvider = memo(({ value, children }: ContextProviderProps) => (
    <Context.Provider {...{ value }}>{children}</Context.Provider>
  ));

  ContextProvider.displayName = `${dn}Provider`;

  return {
    [`use${dn}`]: useContextValue,
    [`${dn}Provider`]: ContextProvider,
  } as CreateContextFactory<ContextValue, DN>;
}

//

const a = contextFactory<number, "User">("User");
a.UserProvider;
const b = contextFactory<number>();
b.ContextProvider;
// b.ContextXProvider;

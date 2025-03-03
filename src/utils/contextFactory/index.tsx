import React, { createContext, memo, useContext } from "react";
import { MaybeDisplayName } from "../../types";
import { ResolveDisplayName, resolveDisplayName } from "../resolveDisplayName";

export type CreateContextFactory<ContextValue, DN extends MaybeDisplayName> = {
  [K in `use${ResolveDisplayName<DN>}`]: () => ContextValue;
} & {
  [K in `${ResolveDisplayName<DN>}Provider`]: React.MemoExoticComponent<
    (props: { value: ContextValue; children: React.ReactNode }) => JSX.Element
  >;
};

export function contextFactory<ContextValue>() {
  //
  return function <DN extends MaybeDisplayName>(
    displayName: DN = "Context" as DN
  ): CreateContextFactory<ContextValue, DN> {
    const dn = resolveDisplayName(displayName);

    const ReActionContext = createContext<ContextValue | undefined>(undefined);
    ReActionContext.displayName = dn;

    function useContextValue(): ContextValue {
      const value = useContext(ReActionContext);

      if (value === undefined) {
        throw new Error(`${dn} must be used within a ${dn}Provider`);
      }

      return value;
    } // TODO: add debug name

    type ReActionProviderProps = {
      value: ContextValue;
      children: React.ReactNode;
    };

    const ReActionProvider = memo(
      ({ value, children }: ReActionProviderProps) => (
        <ReActionContext.Provider {...{ value }}>
          {children}
        </ReActionContext.Provider>
      )
    );

    ReActionProvider.displayName = `${dn}Provider`;

    return {
      [`use${dn}`]: useContextValue,
      [`${dn}Provider`]: ReActionProvider,
    } as CreateContextFactory<ContextValue, DN>;
  };
}

//

const a = contextFactory<number>()("User");
a.UserProvider;
const b = contextFactory<number>()();
b.ContextProvider;

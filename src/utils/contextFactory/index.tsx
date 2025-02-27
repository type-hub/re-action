import React, { createContext, memo, useContext } from "react";
import { DisplayName } from "../../types";

export function contextFactory<ContextValue>() {
  return function <DN extends DisplayName>(displayName: DN) {
    const ReActionContext = createContext<ContextValue | undefined>(undefined);
    ReActionContext.displayName = displayName;

    function useContextValue(): ContextValue {
      const value = useContext(ReActionContext);

      if (value === undefined) {
        throw new Error(
          `${displayName} must be used within a ${displayName}Provider`
        );
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

    ReActionProvider.displayName = `${displayName}Provider`;

    return {
      [`use${displayName}` as const]: useContextValue,
      [`${displayName}Provider`]: ReActionProvider,
    } as {
      [K in `use${DN}`]: typeof useContextValue;
    } & {
      [K in `${DN}Provider`]: typeof ReActionProvider;
    };
  };
}

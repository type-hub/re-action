import React, { createContext, memo, useContext } from "react";

export function contextFactory<ContextValue>() {
  return function <DisplayName extends Capitalize<string>>(
    displayName: DisplayName
  ) {
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
    } // + debug name

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
      [`use${displayName}State` as const]: useContextValue,
      [`${displayName}Provider`]: ReActionProvider,
    } as {
      [K in `use${DisplayName}State`]: typeof useContextValue;
    } & {
      [K in `${DisplayName}Provider`]: typeof ReActionProvider;
    };
  };
}

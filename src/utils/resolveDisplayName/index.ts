import { DISPLAY_NAME } from "../../types";

const ContextDisplayName = "Context" as const;

export type ResolveDisplayName<T> = [T] extends [string]
  ? [string] extends [T]
    ? typeof ContextDisplayName
    : T
  : typeof ContextDisplayName;

export const resolveDisplayName = <DN extends DISPLAY_NAME | undefined>(
  displayName: DN
): ResolveDisplayName<DN> => {
  if (displayName) {
    return displayName as ResolveDisplayName<DN>;
  } else {
    return ContextDisplayName as ResolveDisplayName<DN>;
  }
};

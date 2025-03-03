const Context = "Context" as const;

export type ResolveDisplayName<T> = T extends string ? T : typeof Context;

export const resolveDisplayName = <T extends string | undefined = undefined>(
  s?: T
): ResolveDisplayName<T> => {
  if (s) {
    return s as any;
  } else {
    return Context as any;
  }
};

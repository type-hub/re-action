import { DISPLAY_NAME } from "../../types"

const ContextDisplayName = "Context" as const

export type ResolveDisplayName<T> = [T] extends [string]
  ? [string] extends [T]
    ? typeof ContextDisplayName
    : T
  : typeof ContextDisplayName

export const resolveDisplayName = <DN extends DISPLAY_NAME | undefined>(
  dn: DN,
): ResolveDisplayName<DN> =>
  dn
    ? (dn as ResolveDisplayName<DN>)
    : (ContextDisplayName as ResolveDisplayName<DN>)

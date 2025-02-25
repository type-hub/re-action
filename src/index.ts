export * from "./creators";
export * from "./hooks";
export * from "./types";
// export * from "./utils";

// final exports
export * from "./utils/contextFactory";

/*

TODO:
- check react 16-19 usages
- func: obj keys as AC types
- eventify
  - design API
  - ensure that html node has ID
- useSlice
- action prefix for readability
- how to optimize store updates
- support async actions
- Dev Ux
  - redux dev tools
  - logger in dev modes

Exports
- core
- utils funcs
  - contextFactory
- types
  - GetActionTypes

DOCS:
- philosophy: plain react wrapper, no new concepts, familiar API
- useReducer... but better :)
- redux usage with dev tools
- motivation, what is wrong with useState (higher cognitive load)

OTHER:
- use as redux refactor tool -> mapper for multi useState? should allow to make gradual transition to useReducer
  should be available at least for primitives action.setOpenOn


*/

<h1 align="center">re-action</h1>

<p align="center">
<b>re-action</b> provides a structured way to work with useReducer by offering a collection of hooks, utilities, and component creators. It streamlines action binding, context management, and reducer setup, making state management more intuitive and scalable.
</p>

## Motivation

xyz

## Installation

Via npm

```sh
npm install @type-hub/re-action
```

# Documentation

- [Sandbox examples](#sandbox-examples)
- [API Reference](#api-reference)
  - [`useBindedActions`](#useBindedActions)
  - [`useBindedReducer`](#useBindedReducer)
  - [`setupUseActions`](#setupUseActions)
  - [`setupUseReducer`](#setupUseReducer)
  - [`createStore`](#createStore)
  - [`GetActionTypes`](#GetActionTypes)

## Sandbox examples

- [useBindedActions](https://stackblitz.com/edit/vitejs-vite-pbfaydmg?embed=1&file=src%2Fpages%2FPageE.tsx)

- [useBindedReducer](https://stackblitz.com/edit/vitejs-vite-pbfaydmg?embed=1&file=src%2Fpages%2FPageE.tsx)

- [setupUseActions](https://stackblitz.com/edit/vitejs-vite-pbfaydmg?embed=1&file=src%2Fpages%2FPageE.tsx)

- [setupUseReducer](https://stackblitz.com/edit/vitejs-vite-pbfaydmg?embed=1&file=src%2Fpages%2FPageE.tsx)

- [createStore](https://stackblitz.com/edit/vitejs-vite-pbfaydmg?embed=1&file=src%2Fpages%2FPageE.tsx)

- [GetActionTypes](https://stackblitz.com/edit/vitejs-vite-pbfaydmg?embed=1&file=src%2Fpages%2FPageE.tsx)

## Hooks

### `useBindedActions`

```ts
const bindedActions = useBindedActions(dispatch, actionsCreators);
```

useBindedActions is a React hook that binds action creators to a dispatch function, ensuring actions are dispatched directly when called. It memoizes the bound actions to maintain reference stability and prevent unnecessary re-renders. By dynamically mapping action creators to dispatch, it simplifies state management in a Redux-like setup.

### `useBindedReducer`

```ts
const bindedActions = useBindedReducer(reducer, actionsCreators, initState);
```

useBindedReducer is a React hook that combines useReducer with useBindedActions, providing a stateful reducer along with action creators that are automatically bound to dispatch. It ensures that actions are dispatched seamlessly when called, simplifying state updates while maintaining reference stability. The hook returns the current state, the bound action creators, and the raw dispatch function for flexibility.

## Setup

### `setupUseActions`

```ts
const { TestProvider, useTest, useTestActions } = setupUseActions(
  actionsCreators,
  "Name"
);
```

setupActions is a utility that creates a context-based action binding system, generating a named action context and a hook for accessing bound action creators. It resolves an optional display name to provide a context-aware API, ensuring actions are consistently dispatched within the application. The returned object includes a React context for actions and a dynamically named hook (use[DisplayName]Actions) for binding actions to a given dispatch function.

### `setupUseReducer`

```ts
const {
  TestActionsProvider,
  TestStateProvider,
  useTestActions,
  useTestReducer,
  useTestState,
} = setupUseReducer(reducer, actionCreators, "Test");
```

setupUseReducer is a utility that generates a named reducer context, along with state and action contexts, enabling structured state management. It creates a dynamically named hook (use[DisplayName]Reducer) that initializes a reducer with bound actions while also exposing separate contexts for state and actions. This ensures encapsulated, context-aware state management within a React application.

## Component Creators

### `createStore`

```ts
const { TestProvider, useTestState, useTestActions } = create(
  reducer,
  actionCreators,
  "Test"
);
```

create is a utility that sets up a fully encapsulated state management system using React context and a reducer. It dynamically generates a provider component ([DisplayName]Provider) to manage state and actions, along with hooks (use[DisplayName]State and use[DisplayName]Actions) for accessing them. This allows for a structured and reusable approach to managing state across a React application.

## Type Utils

### `GetActionTypes`

```ts
type Actions = GetActionTypes<typeof actionCreators>;

const reducer = (state: State, action: Actions): State => {
  /* ... */
  return state;
};
```

GetActionTypes extracts the union of all possible action objects returned by an action creators object. It iterates over each key in AC, retrieves the return type of the corresponding function, and combines them into a single union type. This allows for precise typing of actions dispatched in a reducer.

## Setup

```ts
type State = {
  counter: number;
};

const initState: State = { age: 42 };

const actionCreators = {
  add: (payload: number) => ({ payload, type: "ADD" as const }), // TODO: skip type - use keys instead -> build actionCreators
  sub: (payload: string) => ({ payload, type: "SUB" as const }),
} as const;

function reducer(state: State, action: GetActionTypes<typeof actionCreators>) {
  if (action.type === "ADD") {
    return {
      age: state.counter + 1,
    };
  }
  if (action.type === "SUB") {
    return {
      age: state.counter - 1,
    };
  }

  throw Error("Unknown action.");
}
```

## Usage

### useBindedActions()

Use this hook when state and dispatch is already created

```ts
function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const bindedActions = useBindedActions(actionCreators, dispatch, "eventify");

  return (
    <div>
      <div>{state.age}</div>
      <button onClick={bindedActions.add}>ADD</button>
      <button onClick={bindedActions.sub}>SUB</button>
    </div>
  );
}
```

### useBindedReducer()

Use this hook when useReducer is not yet created

```ts
function App() {
  const [state, bindedActions, dispatch] = useBindedReducer(
    initState,
    actionCreators,
    dispatch
  );

  return (
    <div>
      <div>{state.age}</div>
      <button onClick={bindedActions.add}>ADD</button>
      <button onClick={bindedActions.sub}>SUB</button>
    </div>
  );
}
```

### createBindedActionsContext()

use one hook with support

```ts
const bindedContext = createBindedActionsContext<State>()(
  actionCreators,
  "CounterState"
);

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  const [state, bindedActions] = bindedContext.useTypedBindedAction(dispatch);

  return (
    <div>
      <div>{state.age}</div>
      <bindedContext.ActionsProvider value={bindedActions}>
        {() => {
          const bindedActions = bindedContext.useActionContext();

          return (
            <div>
              <div>{state.age}</div>
              <button onClick={bindedActions.add}>ADD</button>
              <button onClick={bindedActions.sub}>SUB</button>
            </div>
          );
        }}
      </bindedContext.ActionsProvider>
    </div>
  );
}
```

<h1 align="center">re-action</h1>

<p align="center">
<b>re-action</b> provides a structured way to work with useReducer by offering a collection of hooks, utilities, and component creators. It streamlines action binding, context management, and reducer setup, making state management more intuitive and scalable.
</p>

## 💡 Motivation

In modern React development, managing complex state has become increasingly challenging. While the useReducer Hook offers a way to handle state logic, developers often encounter several pain points:

- **Verbose Syntax**: Manually dispatching actions can lead to boilerplate code, making components harder to read and maintain.
- **Scalability Issues**: As applications grow, setting up and managing reducers and contexts can become cumbersome, hindering scalability.
- **TypeScript Integration**: Ensuring type safety with useReducer requires additional effort, which can be error-prone and time-consuming.

Recognizing these challenges, re-action was developed to streamline state management in React applications. By offering a suite of hooks, utilities, and component creators, it simplifies action binding, context management, and reducer setup. This not only reduces boilerplate but also enhances code readability and maintainability, allowing developers to focus on building features rather than managing state intricacies.

## 🚀 Benefits

- Small Size: Less than 10KB
- Simplified `useReducer`: Cleaner syntax for state management
- No More Dispatch Calls: Reduces boilerplate code
- Gradual Refactoring Support: Eases transitions in legacy code
- TypeScript Ready: Built-in TypeScript support
- Optimized Everything: Performance-optimized for efficiency

## 📦 Installation

Via npm:

```sh
npm install @type-hub/re-action
```

## 📚 Documentation

- [Sandbox examples](#sandbox-examples)
- [API Reference](#api-reference)
  - [`useBindedActions`](#useBindedActions)
  - [`useBindedReducer`](#useBindedReducer)
  - [`setupUseActions`](#setupUseActions)
  - [`setupUseReducer`](#setupUseReducer)
  - [`createStore`](#createStore)
  - [`GetActionTypes`](#GetActionTypes)
  - [`contextFactory`](#contextFactory)

## 📚 Vocabulary

**Action**

```ts
{ type: string, payload: any }
```

**ActionCreator**

```ts
(payload: any) => { type: string, payload: any }
```

**ActionCreators**

```ts
Record<string, (payload: any) => { type: string; payload: any }>
```

## 🛠 Sandbox Examples

- [useBindedActions](https://stackblitz.com/edit/vitejs-vite-pbfaydmg?embed=1&file=src%2Fpages%2FPageA.tsx)
- [useBindedReducer](https://stackblitz.com/edit/vitejs-vite-pbfaydmg?embed=1&file=src%2Fpages%2FPageB.tsx)
- [setupUseActions](https://stackblitz.com/edit/vitejs-vite-pbfaydmg?embed=1&file=src%2Fpages%2FPageC.tsx)
- [setupUseReducer](https://stackblitz.com/edit/vitejs-vite-pbfaydmg?embed=1&file=src%2Fpages%2FPageD.tsx)
- [createStore](https://stackblitz.com/edit/vitejs-vite-pbfaydmg?embed=1&file=src%2Fpages%2FPageE.tsx)
- [GetActionTypes](https://stackblitz.com/edit/vitejs-vite-pbfaydmg?file=src%2Fstore%2Factions.ts)

## ⚡ Hooks

### `useBindedActions()`

```ts
const bindedActions = useBindedActions(dispatch, actionsCreators)
```

**useBindedActions** is a React hook that binds action creators to a **dispatch** function, ensuring actions are dispatched directly when called. It memoizes the bound actions to maintain reference stability and prevent unnecessary re-renders. By dynamically mapping action creators to **dispatch**, it simplifies state management in a Redux-like setup.

### `useBindedReducer()`

```ts
const bindedActions = useBindedReducer(reducer, actionsCreators, initState)
```

**useBindedReducer** is a React hook that combines **useReducer** with **useBindedActions**, providing a stateful reducer along with action creators that are automatically bound to **dispatch**. It ensures that actions are dispatched seamlessly when called, simplifying state updates while maintaining reference stability. The hook returns the current **state**, the **bound action creators**, and the **raw dispatch** function for flexibility.

## 🎯 Setup

### `setupUseActions()`

```ts
const { TestProvider, useTest, useTestBindedActions } = setupUseActions(
  actionsCreators,
  "Name",
)
```

**setupActions** is a utility that creates a context-based action binding system, generating a **named action context** and a **hook** for accessing bound action creators. It resolves an optional display name to provide a context-aware API, ensuring actions are consistently dispatched within the application. The returned object includes a React **context for actions** and a **dynamically named hook** (use[DisplayName]BindedActions) for **binding actions** to a given **dispatch** function.

### `setupUseReducer()`

```ts
const {
  TestActionsProvider,
  TestStateProvider,
  useTestActions,
  useTestReducer,
  useTestState,
} = setupUseReducer(reducer, actionCreators, "DisplayName)
```

**setupUseReducer** is a utility that generates a **named reducer context**, along with **state** and **action contexts**, enabling structured state management. It creates a dynamically named hook (use[DisplayName]Reducer) that initializes a reducer with bound actions while also exposing separate contexts for state and actions. This ensures encapsulated, context-aware state management within a React application.

## 🎨 Component Creators

### `createStore()`

```ts
const { TestProvider, useTestState, useTestActions } = create(
  reducer,
  actionCreators,
  "DisplayName,
)
```

**create** is a utility that sets up a fully encapsulated state management system using React context and a reducer. It dynamically generates a **provider component** ([DisplayName]Provider) to manage state and actions, along with **hooks** (use[DisplayName]State and use[DisplayName]Actions) for accessing them. This allows for a structured and reusable approach to managing state across a React application.

## 🔍 Type Utils

### `GetActionTypes<>`

```ts
type Actions = GetActionTypes<typeof actionCreators>

const reducer = (state: State, action: Actions): State => {
  /* ... */
  return state
}
```

**GetActionTypes** extracts the **union** of all possible **action objects** returned by an action creators object. It iterates over each key in AC, retrieves the return type of the corresponding function, and combines them into a single union type.

## 🛠 Utils

### `setupActionsCreators()`

```ts
export const actionCreators = setupActionsCreators({
  increment: (amount: number) => amount,
  decrement: (amount: number) => amount,
})
```

This function **generates action creators** from a given **lookup object** containing functions. It iterates over the keys of the provided function lookup, wrapping each function to create a standardized action object containing a type derived from the key and a payload produced by invoking the corresponding function. This approach ensures type safety by inferring input parameters and return types, making it easier to define consistent and predictable action creators for state management in a functional and type-driven way.

### `contextFactory()`

```ts
const contextName = "DisplayName
const a = contextFactory<State, typeof contextName>(contextName)
```

This utility function creates a strongly-typed React context factory, generating a **custom provider** and a **corresponding hook** for accessing the context value. It ensures that consumers of the hook cannot access the context outside of its provider, throwing an error if misused. The provider is wrapped in React.memo to optimize re-renders, and both the **provider and hook names** are **dynamically derived** from an optional **display name**. This approach simplifies context creation by enforcing type safety and reducing boilerplate when managing shared state in a React application.

# re-action

## Docs

### Setup

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

### Usage

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

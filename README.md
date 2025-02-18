# re-action

## Goal

```js
const useReAction = (actions, reducer, initState) => {
  const [state, dispatch] = useReducer(notePadReducer, initState);
  const bindedActions = useBindedActions(actions, dispatch);

  const { useReState, ReStateProvider } = contextFactory(state);
  const { useReActions, ReActionProvider } = contextFactory(bindedActions);

  return {
    state,
    dispatch,
    bindedActions,
    useReState,
    ReStateProvider,
    useReActions,
    ReActionProvider,
  };
};
```

## TODO

### now

- [ ] useBindedActions
- [ ] contextFactory

### later

- [ ] support async actions

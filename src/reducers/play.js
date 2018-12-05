export default (state = [], action) => {
  switch (action.type) {
    case 'PLAY':
      return { ...state,
        choice: action.choice,
        result: action.result,
      }
    default:
      return state;
  }
}

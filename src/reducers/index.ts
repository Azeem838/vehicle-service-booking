export default function reducer(state={}, action: any): any {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        userData: action.user
      }
    case 'LOG_OUT':
      return {
        ...state,
        userData: ''
      }
  }
  return state
}
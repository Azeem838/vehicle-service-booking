const initState = {}

export default function reducer(state=initState, action: any): any {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        userData: action.user
      }
    case 'LOG_OUT':
      return {}
    case 'SET_APPOINTMENTS':
      return {
        ...state,
        appointments: action.appointments
      }
    case 'SET_SERVICES':
      return {
        ...state,
        services: action.services
      }
  }
  return state
}
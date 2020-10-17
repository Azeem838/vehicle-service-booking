const initState = {
  userData: {
    token: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.JC6qKuH9SG0SIiYSfhZUFTtirxN9Q47buLk0DPFFFzE",
    user: {
      email: "azeem@example.com",
      username: "azeem"
    }
  }
}

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
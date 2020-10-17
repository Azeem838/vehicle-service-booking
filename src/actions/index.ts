export const setUser = (user: any) => {
  return {
    type: "SET_USER",
    user
  }
}

export const setLogout = () => {
  return {
      type: "LOG_OUT"
  }
}

export const setUserAppointments = (appointments: any) => {
  return {
    type: "SET_APPOINTMENTS",
    appointments
  }
}

export const setServices = (services: any) => {
  return {
    type: "SET_SERVICES",
    services
  }
}
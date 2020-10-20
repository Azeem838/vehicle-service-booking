export const setUser = (user: any) => ({
  type: 'SET_USER',
  user,
});

export const setLogout = () => ({
  type: 'LOG_OUT',
});

export const setUserAppointments = (appointments: any) => ({
  type: 'SET_APPOINTMENTS',
  appointments,
});

export const setServices = (services: any) => ({
  type: 'SET_SERVICES',
  services,
});

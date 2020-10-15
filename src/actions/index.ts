export const setUser = (user: any) => {
  return {
    type: "SET_USER",
    user
  }
}

export const logOut = () => {
  return {
      type: "LOG_OUT"
  }
}
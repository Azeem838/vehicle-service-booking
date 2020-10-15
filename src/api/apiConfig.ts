import { toast } from '../components/toast';

export async function loginUser(username: string, email: string, password: string) {
  try {
      const res = await fetch('http://localhost:3000/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify({
      username, 
      email, 
      password
    })
  })
  const data = await res.json();
  return data
  } catch (error) {
    const res = {error: 'Please check your internet connection'}
    return res
  }

}

export async function registerUser(username: string, email: string, password: string) {
  try {
    const res = await fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({
        username, 
        email, 
        password
      })
    })
    const data = await res.json();
    return data
  } catch (error) {
    const res = {error: 'Please check your internet connection'}
    return res
  }
}

export async function request(token:string, path:string, method:string, body:object) {
  try {
  const requestConfig = {
    method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Accept':'application/json',
      'Authorization':`Bearer ${token}`
    },
  }
  if (method !== 'GET' && method !== 'DELETE'){
    Object.assign(requestConfig, {body: JSON.stringify(body)});
  }
  
  const  res = await fetch(`http://localhost:3000/${path}`, requestConfig)
  const response = await res.json()
  console.log(response)
  toast(response.message)
  return response
}
  catch(error){
    toast(error.message)
  }
}
export async function loginUser(username: string, password: string) {
  try {
    const res = await fetch('https://vehicle-service-booking-api.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    const res = { error: 'Please check your internet connection' };
    return res;
  }
}

export async function registerUser(
  username: string,
  email: string,
  password: string,
) {
  try {
    const res = await fetch('https://vehicle-service-booking-api.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    const res = { error: 'Please check your internet connection' };
    return res;
  }
}

export async function request(
  token: string,
  path: string,
  method: string,
  body: Record<string, unknown>,
) {
  try {
    const requestConfig = {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    if (method !== 'GET' && method !== 'DELETE') {
      Object.assign(requestConfig, { body: JSON.stringify(body) });
    }

    const res = await fetch(`https://vehicle-service-booking-api.herokuapp.com/${path}`, requestConfig);
    const response = await res.json();
    return response;
  } catch (error) {
    const res = { error: 'Please check your internet connection' };
    return res;
  }
}

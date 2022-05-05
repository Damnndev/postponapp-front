// Helper para ayudar a poner el token

const baseUrl = process.env.REACT_APP_API_URL;

const fetchWihtoutToken = (endpoint, data, method = 'GET') => {

  const url = `${ baseUrl }/${ endpoint }`;

  if( method === 'GET') {
    return fetch(url);
  }else {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
}

const fetchWithToken = (endpoint, data, method = 'GET') => {

  const url = `${ baseUrl }/${ endpoint }`;
  console.log(url);
  console.log(data);
  // recuperamos el token del localStorage en caso de null string vacío
  const token = localStorage.getItem('token') || '';
  console.log(token);

  if( method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        'x-token': token
      }
    });
  }else {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify(data)
    });
  }
}


export {
  fetchWihtoutToken,
  fetchWithToken
}
import config from '../config.json';

function sendRequest(options) {
  return new Promise((resolve, reject) => {
    const {url, method, other} = options;
    const endpoint = `${config.server}${url}`;
    fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...other,
    })
      .then(response => {
        const statusCode = response.status;
        console.log(statusCode);
        return response.json();
      })
      .then(newItems => {
            // console.log(`------URL->${url}----------`);
            // console.log(newItems);
            // console.log(`------URL->${url}----------`);
        resolve(newItems);
      })
      .catch(error => {
        // console.log(`----ERROR**********--URL->${url}----------`);
        // console.log(error);
        // console.log(`----ERROR**********--URL->${url}----------`);
        reject(error);
      });
  });
}

export {sendRequest};

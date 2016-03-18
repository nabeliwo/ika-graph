import axios from 'axios';

const cookieValue = getCookie('password');
const passwords = {
  fetch: () => {
    return new Promise((resolve, reject) => {
      axios({
        url: '/api/v1/passwords/',
        timeout: 10000,
        method: 'GET',
        responseType: 'json'
      })
      .then(res => {
        const data = res.data;
        const register = {
          mode: data.some(item => item.password_key === cookieValue),
          pass: data
        };

        resolve(register);
      })
      .catch(err => {
        reject();
      });
    });
  }
};

function getCookie(name) {
  let result = null;
  const cookieName = name + '=';
  const allcookies = document.cookie;
  const position = allcookies.indexOf(cookieName);

  if (position !== -1) {
    const startIndex = position + cookieName.length;
    let endIndex = allcookies.indexOf(';', startIndex);

    if (endIndex === -1) {
      endIndex = allcookies.length;
    }

    result = decodeURIComponent(allcookies.substring(startIndex, endIndex));
  }

  return result;
}

export default passwords;

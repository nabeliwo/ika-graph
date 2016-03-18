import axios from 'axios';

const bukis = {
  fetch: () => {
    return new Promise((resolve, reject) => {
      axios({
        url: '/api/v1/bukiOthers/',
        timeout: 10000,
        method: 'GET',
        responseType: 'json'
      })
      .then(res => {
        const state = res.data;

        resolve(state);
      })
      .catch(err => {
        reject();
      });
    });
  }
};

export default bukis;

import axios from 'axios';

const url = '/api/v1/results/';
const results = {
  fetch: () => {
    return new Promise((resolve, reject) => {
      axios({
        url: url,
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
  },
  post: formData => {
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        timeout: 10000,
        method: 'POST',
        responseType: 'json',
        data: formData
      })
      .then(res => {
        console.log(res);

        // resolve();
      })
      .catch(err => {
        console.log(err);
        // reject();
      });
    });
  }
};

export default results;

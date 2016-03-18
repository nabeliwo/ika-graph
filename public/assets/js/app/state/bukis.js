import axios from 'axios';

const bukis = {
  fetch: () => {
    return new Promise((resolve, reject) => {
      axios({
        url: '/api/v1/bukis/',
        timeout: 10000,
        method: 'GET',
        responseType: 'json'
      })
      .then(res => {
        const state = res.data.sort(function(a, b) {
          if (a.buki_id < b.buki_id) return -1;
          if (a.buki_id > b.buki_id) return 1;
          return 0;
        });

        resolve(state);
      })
      .catch(err => {
        reject();
      });
    });
  }
};

export default bukis;

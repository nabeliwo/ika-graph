import axios from 'axios';

const stages = {
  fetch: () => {
    return new Promise((resolve, reject) => {
      axios({
        url: '/api/v1/stages/',
        timeout: 10000,
        method: 'GET',
        responseType: 'json'
      })
      .then(res => {
        const state = res.data.sort(function(a, b) {
          if (a.stage_id < b.stage_id) return -1;
          if (a.stage_id > b.stage_id) return 1;
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

export default stages;

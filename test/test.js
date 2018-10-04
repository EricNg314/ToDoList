const axios = require('axios');

axios.post('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/notes/createNote')
.then(response => {
  console.log(response);
  const data = response.data;

  console.log(`Created Data (T/F)`)
})





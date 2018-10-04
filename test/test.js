const axios = require('axios');

axios.post('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/notes/createNote')
.then(response => {
  // console.log(response);
  const data = response.data;

  console.log(`createNote function: `)
  console.log(JSON.stringify(data))
})


axios.get('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/notes/all')
.then(response => {
  // console.log(response);
  const data = response.data;

  console.log(`getAllNotes function: `)
  console.log(JSON.stringify(data))
})


axios.patch('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/notes/{noteId}')
.then(response => {
  // console.log(response);
  const data = response.data;

  console.log(`updateNote function: `)
  console.log(JSON.stringify(data))
})


axios.delete('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/notes/{noteId}')
.then(response => {
  // console.log(response);
  const data = response.data;

  console.log(`deleteNote function: `)
  console.log(JSON.stringify(data))
})



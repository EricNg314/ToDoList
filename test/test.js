const axios = require('axios');

axios.post('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks/createTask')
.then(response => {
  // console.log(response);
  const data = response.data;

  console.log(`createTask function: `)
  console.log(JSON.stringify(data))
})


axios.get('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks/all')
.then(response => {
  // console.log(response);
  const data = response.data;

  console.log(`getAllTasks function: `)
  console.log(JSON.stringify(data))
})


axios.patch('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks/{taskId}')
.then(response => {
  // console.log(response);
  const data = response.data;

  console.log(`updateTask function: `)
  console.log(JSON.stringify(data))
})


axios.delete('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks/{taskId}')
.then(response => {
  // console.log(response);
  const data = response.data;

  console.log(`deleteTask function: `)
  console.log(JSON.stringify(data))
})



const axios = require('axios');

const test_objects = require('./test_objects.js');
const createData = test_objects.createData;


const createItem = (createData) => axios.post('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks/create', createData)
  .then(response => {
    // console.log(response);
    console.log('-----------------------------------------------');
    const data = response.data;

    console.log(`createTask function: `);
    console.log(data);
    return data;
  })
// createItem(createData);


const getAllTasks = () => axios.get('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks/all')
.then(response => {
  // console.log(response);
  const data = response.data;

  console.log(`getAllTasks function: `)
  console.log(JSON.stringify(data))
})
// getAllTasks()

// axios.patch('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks/update/{taskId}')
// .then(response => {
//   // console.log(response);
//   const data = response.data;

//   console.log(`updateTask function: `)
//   console.log(JSON.stringify(data))
// })


// axios.delete('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks/delete/{taskId}')
// .then(response => {
//   // console.log(response);
//   const data = response.data;

//   console.log(`deleteTask function: `)
//   console.log(JSON.stringify(data))
// })

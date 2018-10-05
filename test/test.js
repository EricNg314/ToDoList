const axios = require('axios');

const test_objects = require('./test_objects.js');
const createData = test_objects.createData;


const createItem = (createData) => axios.post('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks/create', createData)
  .then(response => {
    let testResult = false;
    const data = response.data;

    if (data.taskId === createData.taskId) {
      testResult = true;
    }

    return testResult;
  });
// createItem(createData);


const getAllTasks = () => axios.get('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks/all')
  .then(response => {
    let testResult = false;
    let testResultOfCreate = false;
    const data = response.data;

    if (data.length > 0){
      testResult = true;
    }

    for (let i = 0; i < data.length; i++) {
      if(data[i].taskId === createData.taskId){
        testResultOfCreate = true;
      }
    }

    return {'testResult': testResult, 'testResultOfCreate': testResultOfCreate};
  });
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

async function test() {
  let testComplete = false;
  console.log('-----------------START TEST-------------------')
  try {
    console.log('-----------------createItem TEST-------------------')
    const createItemTest = await createItem(createData);
    console.log(`${createItemTest} - createItem - TEST RESULT`);

    console.log('-----------------getAllTasks TEST-------------------')
    const getAllTaskTest = await getAllTasks();
    console.log(`${getAllTaskTest.testResult} - getAllTaskTest - ALL ITEMS TEST RESULT`);
    console.log(`${getAllTaskTest.testResultOfCreate} - getAllTaskTest - createItem VALIDATE TEST RESULT:`);

    testComplete = true;
  } catch (err) {

    console.log('-----------------ERROR-------------------')
    console.log(err);
    testComplete = false;
  }
  console.log('-----------------END TEST-------------------')
  console.log(`TEST COMPLETE: ${testComplete}`);
}
test();
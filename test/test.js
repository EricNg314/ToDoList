const axios = require('axios');

const test_objects = require('./test_objects.js');
const createData = test_objects.createData;
const updateData = test_objects.updateData;

const createItem = (createData) => axios.post('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks/create', createData)
  .then(response => {
    let testResult = false;
    const data = response.data;

    if (data.taskId === createData.taskId &&
      data.datePosted === createData.datePosted &&
      data.status === createData.status &&
      data.task === createData.task) {
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

    if (data.length > 0) {
      testResult = true;
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].taskId === createData.taskId) {
        testResultOfCreate = true;
      }
    }

    return { 'testResult': testResult, 'testResultOfCreate': testResultOfCreate };
  });
// getAllTasks()

const updateTask = (taskId, updateData) => axios.patch(`https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks/update/${taskId}`, updateData)
  .then(response => {
    let testResult = false;
    const data = response.data.Attributes;

    if (data.taskId === taskId &&
      data.datePosted === updateData.datePosted &&
      data.status === updateData.status &&
      data.task === updateData.task) {

      testResult = true;
    }

    return testResult
  })
// updateTask(createData.taskId, updateData);


// axios.delete('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks/delete/{taskId}')
// .then(response => {
//   // console.log(response);
//   const data = response.data;

//   console.log(`deleteTask function: `)
//   console.log(JSON.stringify(data))
// })

async function test(createData, updateData) {
  let testComplete = false;
  console.log('-----------------START TEST-------------------\n')
  try {
    console.log('-----------------createItem TEST-------------------')
    const createItemTest = await createItem(createData);
    console.log(`TEST RESULT - ${createItemTest} - createItem\n`);

    console.log('-----------------getAllTasks TEST-------------------')
    const getAllTaskTest = await getAllTasks(updateData);
    console.log(`TEST RESULT - ${getAllTaskTest.testResult} - getAllTaskTest`);
    console.log(`TEST RESULT - ${getAllTaskTest.testResultOfCreate} - getAllTaskTest - createItem VALIDATION \n`);

    console.log('-----------------updateTask TEST-------------------')
    const updateTaskTest = await updateTask(createData.taskId, updateData);
    console.log(`TEST RESULT - ${updateTaskTest} - updateTask\n`);

    testComplete = true;
  } catch (err) {

    console.log('-----------------ERROR-------------------')
    console.log(err);
    testComplete = false;
  }
  console.log('-----------------END TEST-------------------')
  console.log(`TEST COMPLETE: ${testComplete}\n`);
}
test(createData, updateData);

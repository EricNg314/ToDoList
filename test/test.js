const axios = require('axios');

const test_objects = require('./test_objects.js');
const createData = test_objects.createData;

// NOTE: Updating the updateData's status will change results of getTasksByStatus. Consistent validation of testing.
const updateData = test_objects.updateData;
const statusQueryValue = updateData.status;

const createItem = (createData) => axios.post('https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks/create', createData)
  .then(response => {
    let testResult = false;
    const data = response.data;

    if (data.taskId === createData.taskId &&
      data.datePosted === createData.datePosted &&
      data.status === createData.status &&
      data.task === createData.task
      && response.status === 200) {
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

    if (data.length > 0 && response.status === 200) {
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


const getTasksByStatus = (createData, updateData, status) => axios.get(`https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks/filter?status=${status}`)
  .then(response => {
    let testResult = false;
    let testResultOfUpdate = false;

    // console.log(response);
    const data = response.data;

    if (response.status === 200) {
      testResult = true;
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].taskId === createData.taskId && data[i].status === updateData.status) {
        testResultOfUpdate = true;
      }
    }

    return { 'testResult': testResult, 'testResultOfUpdate': testResultOfUpdate };
  })
// getTasksByStatus(createData, statusQueryValue);


const getTaskById = (taskId) => axios.get(`https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks?taskId=${taskId}`)
  .then(response => {
    let testResult = false;

    const data = response.data;

    if (response.status === 200 && taskId === data.taskId) {
      testResult = true;
    }

    return testResult;
  })
// getTaskById('131454f0-c818-11e8-96f4-459028b3cb17');


const updateTask = (taskId, updateData) => axios.patch(`https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks/update/${taskId}`, updateData)
  .then(response => {
    let testResult = false;
    const data = response.data.Attributes;

    if (data.taskId === taskId &&
      data.datePosted === updateData.datePosted &&
      data.status === updateData.status &&
      data.task === updateData.task
      && response.status === 200) {

      testResult = true;
    }

    return testResult
  })
// updateTask(createData.taskId, updateData);


const deleteTask = (taskId) => axios.delete(`https://zruegdeqol.execute-api.us-west-1.amazonaws.com/dev/tasks/delete/${taskId}`)
  .then(response => {
    let testResult = false;
    const data = response.data;

    if (Object.keys(data).length === 0
      && response.status === 200) {
      testResult = true;
    }

    return testResult;
  })
// deleteTask('random taskId here');

async function test(createData, updateData, statusQueryValue) {
  let testComplete = false;
  console.log('-----------------START TEST-------------------\n')
  try {
    console.log('-----------------createItem TEST-------------------')
    const createItemTest = await createItem(createData);
    console.log(`TEST RESULT - ${createItemTest} - createItem\n`);

    console.log('-----------------getAllTasks TEST-------------------')
    const getAllTaskTest = await getAllTasks(updateData);
    console.log(`TEST RESULT - ${getAllTaskTest.testResult} - getAllTask`);
    console.log(`TEST RESULT - ${getAllTaskTest.testResultOfCreate} - getAllTask - createItem VALIDATION \n`);

    console.log('-----------------getTasksByStatus IF "Complete" TEST-------------------')
    const getTasksByStatusTest = await getTasksByStatus(createData, updateData, statusQueryValue);
    console.log(`TEST RESULT - ${getTasksByStatusTest.testResult} - getTasksByStatus`);
    console.log(`TEST RESULT - ${!getTasksByStatusTest.testResultOfUpdate} - getTasksByStatus - updateTask VALIDATION \n`);

    console.log('-----------------getTaskById TEST-------------------')
    const getTaskByIdTest = await getTaskById(createData.taskId);
    console.log(`TEST RESULT - ${getTaskByIdTest} - getTaskById\n`);

    console.log('-----------------updateTask TEST-------------------')
    const updateTaskTest = await updateTask(createData.taskId, updateData);
    console.log(`TEST RESULT - ${updateTaskTest} - updateTask\n`);

    console.log('-----------------getTasksByStatus IF "Complete" AFTER updateTask TEST-------------------')
    const getTasksByStatusAfterUpdateTest = await getTasksByStatus(createData, updateData, statusQueryValue);
    console.log(`TEST RESULT - ${getTasksByStatusAfterUpdateTest.testResult} - getTasksByStatus`);
    console.log(`TEST RESULT - ${getTasksByStatusAfterUpdateTest.testResultOfUpdate} - getTasksByStatus - updateTask VALIDATION \n`);

    console.log('-----------------deleteTask TEST-------------------')
    const deleteTaskTest = await deleteTask(createData.taskId);
    console.log(`TEST RESULT - ${deleteTaskTest} - deleteTask\n`);

    console.log('-----------------getAll AFTER deleteTask TEST-------------------')
    const getAllAfterDeleteTest = await getAllTasks(updateData);
    console.log(`TEST RESULT - ${getAllAfterDeleteTest.testResult} - getAllTasks`);
    console.log(`TEST RESULT - ${!getAllAfterDeleteTest.testResultOfCreate} - getAllTasks - deleteTask VALIDATION \n`);

    testComplete = true;
  } catch (err) {

    console.log('-----------------ERROR-------------------')
    console.log(err);
    testComplete = false;
  }
  console.log('-----------------END TEST-------------------')
  console.log(`TEST COMPLETE: ${testComplete}\n`);
}
test(createData, updateData, statusQueryValue);

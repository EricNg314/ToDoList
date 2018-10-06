'use strict';

const AWS = require('aws-sdk');

const TASKS_TABLE = process.env.TASKS_TABLE;
const AWS_DEPLOY_REGION = process.env.AWS_DEPLOY_REGION;

const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: AWS_DEPLOY_REGION });

module.exports.createTask = async (event, context) => {

  let parsed;

  try {
    parsed = JSON.parse(event.body);
  } catch (err) {
    console.error(`Failed to parse JSON ${event.body}: ${err.stack}`);
    return {
      statusCode: 500,
      error: `Could not parse JSON: ${err.stack}`
    }
  }

  const taskId = parsed.taskId;
  const datePosted = parsed.datePosted;
  const status = parsed.status;
  const task = parsed.task;

  const params = {
    TableName: TASKS_TABLE,
    Item: {
      taskId,
      datePosted,
      status,
      task
    }
  }

  try {
    const data = await dynamoDb.put(params).promise();
    console.log(`createTask function success with data: ${JSON.stringify(data)}`);

    return {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    }

  } catch (err) {
    console.error(`createTask function failed for taskId: ${taskId}`);
    console.error(`createTask function failed with error: ${err.stack}`)
    return {
      statusCode: 400,
      body: `Could not create task: ${err.stack}`
    }
  }

};

module.exports.getAllTasks = async (event, context) => {

  const params = {
    TableName: TASKS_TABLE
  }

  try {
    const data = await dynamoDb.scan(params).promise();
    console.log(`getAllTasks function success with data: ${JSON.stringify(data)}`);
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    }

  } catch (err) {
    console.error(`getAllTasks function failed with error: ${err.stack}`);

    return {
      statusCode: 400,
      body: `Could not get all tasks: ${err.stack}`
    }
  }
};

module.exports.getTasksByStatus = async (event, context) => {

  const status = event.queryStringParameters.status;

  // Using ExpressionAttributeNames for "status" column to change to '#status'. "Status" is a reserved keyword in AWS DynamoDB.
  const params = {
    TableName: TASKS_TABLE,
    ExpressionAttributeNames: {"#status": "status"},
    FilterExpression: "#status = :status",
    ExpressionAttributeValues:{
      ":status": status
    }
  }

  try {
    const data = await dynamoDb.scan(params).promise();
    console.log(`getTasksByStatus function success with data: ${JSON.stringify(data)}`);
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    }

  } catch (err) {
    console.error(`getTasksByStatus function failed with error: ${err.stack}`);

    return {
      statusCode: 400,
      body: `Could not get all tasks: ${err.stack}`
    }
  }
};



module.exports.getTaskById = async (event, context) => {

  const taskId = event.queryStringParameters.taskId;

  const params = {
    TableName: TASKS_TABLE,
    Key: { "taskId": taskId }
  }

  try {
    // Using get method since taskId is our primary key.
    const data = await dynamoDb.get(params).promise();
    console.log(`getTaskById function success with data: ${JSON.stringify(data)}`);
    return {
      statusCode: 200,
      body: JSON.stringify(data.Item)
    }

  } catch (err) {
    console.error(`getTaskById function failed for taskId: ${taskId}`);
    console.error(`getTaskById function failed with error: ${err.stack}`);
    return {
      statusCode: 400,
      body: `Could not update task: ${err.stack}`
    }
  }
};

module.exports.updateTask = async (event, context) => {

  let parsed;

  try {
    parsed = JSON.parse(event.body);
  } catch (err) {
    console.error(`Failed to parse JSON ${event.body}: ${err.stack}`);
    return {
      statusCode: 500,
      error: `Could not parse JSON: ${err.stack}`
    }
  }

  const taskId = event.pathParameters.taskId;
  const datePosted = parsed.datePosted;
  const status = parsed.status;
  const task = parsed.task;

  // Using ExpressionAttributeNames for "status" column to change to '#status'. "Status" is a reserved keyword in AWS DynamoDB.
  const params = {
    TableName: TASKS_TABLE,
    Key: { "taskId": taskId },
    ExpressionAttributeNames: { "#status": "status" },
    UpdateExpression: "SET datePosted = :datePosted, #status = :status, task = :task",
    ExpressionAttributeValues: {
      ":datePosted": datePosted,
      ":status": status,
      ":task": task
    },
    ReturnValues: "ALL_NEW"
  }

  try {
    const data = await dynamoDb.update(params).promise();
    console.log(`updateTask function success with data: ${JSON.stringify(data)}`);
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch (err) {
    console.error(`updateTask function failed for taskId: ${taskId}`);
    console.error(`updateTask function failed with error: ${err.stack}`);
    return {
      statusCode: 400,
      body: `Could not update task: ${err.stack}`
    }
  }
};

module.exports.deleteTask = async (event, context) => {

  const taskId = event.pathParameters.taskId;

  const params = {
    TableName: TASKS_TABLE,
    Key: { 'taskId': taskId }
  }

  try {
    const data = await dynamoDb.delete(params).promise();
    console.log(`deleteTask function success with data: ${JSON.stringify(data)}`);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch (err) {
    console.error(`deleteTask function failed for taskId: ${taskId}`);
    console.error(`deleteTask function failed with error: ${err.stack}`);
    return {
      statusCode: 400,
      body: `Could not delete task: ${err.stack}`
    }
  }
};




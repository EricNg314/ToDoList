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

    return{
      statusCode: 200,
      body: JSON.stringify(data.Item)
    }
  } catch (err) {
    console.log(`createTask function failed with error: ${err.stack}`)
    return {
      statusCode: 400,
      body: `Could not create task: ${err.stack}`
    }
  }

};

module.exports.getAllTasks = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'getAllTasks task',
      method: event.httpMethod,
      path: event.path,
      query: event.queryStringParameters,
      params: event.pathParameters,
      body: event.body
    })
  };
  return response;
};

module.exports.updateTask = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'update task',
      method: event.httpMethod,
      path: event.path,
      query: event.queryStringParameters,
      params: event.pathParameters,
      body: event.body
    })
  };
  return response;
};

module.exports.deleteTask = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'delete task',
      method: event.httpMethod,
      path: event.path,
      query: event.queryStringParameters,
      params: event.pathParameters,
      body: event.body
    })
  };
  return response;
};




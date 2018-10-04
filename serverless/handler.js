'use strict';

module.exports.createTask = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'create task',
      method: event.httpMethod,
      path: event.path,
      query: event.queryStringParameters,
      params: event.pathParameters,
      body: event.body
    })
  };
  return response;
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




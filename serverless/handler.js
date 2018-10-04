'use strict';

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.createNote = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'create note',
      method: event.httpMethod,
      path: event.path,
      query: event.queryStringParameters,
      params: event.pathParameters,
      body: event.body
    })
  };
  return response;
};

module.exports.getAllNotes = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'getAllNotes text',
      method: event.httpMethod,
      path: event.path,
      query: event.queryStringParameters,
      params: event.pathParameters,
      body: event.body
    })
  };
  return response;
};

module.exports.updateNote = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'updateNote text',
      method: event.httpMethod,
      path: event.path,
      query: event.queryStringParameters,
      params: event.pathParameters,
      body: event.body
    })
  };
  return response;
};

module.exports.deleteNote = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'delete note',
      method: event.httpMethod,
      path: event.path,
      query: event.queryStringParameters,
      params: event.pathParameters,
      body: event.body
    })
  };
  return response;
};




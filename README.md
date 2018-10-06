# ToDoList
A RESTful API created through Serverless Framework using AWS Lambda and DynamoDb.
<hr>

## Built With The Following
* [Javascript](https://www.javascript.com/) - An object-oriented computer programming language.

* [Serverless](https://serverless.com/) - Serverless Framework is a free and open-source web framework written using Node.js.
* [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) - A compute service that lets you run code without provisioning or managing servers. Provided by Amazon as a part of the Amazon Web Services.
* [AWS DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) - A fully managed NoSQL database service that provides fast and predictable performance with seamless scalability. Provided by Amazon as a part of the Amazon Web Services.
* [Node.js](https://nodejs.org/en/) - An open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.

### NPM Packages
* [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client
* [uuid](https://www.npmjs.com/package/uuid) - Simple, fast generation of RFC4122 UUIDS.

## Prerequisites
* To setup Serverless on your machine checkout [Serverless Quick-Start Guide](https://serverless.com/framework/docs/providers/aws/guide/quick-start/).
* Be sure to install packages in the root directory by running the following in your terminal.
  ```
  npm install
  ```

* Once installed, you can now run the following command that tests all of **my** deployed functions.

  ```
  node test/test.js
  ```

* **NOTE:** If you are testing your own deployed functions, be sure to change all https links in "test.js" with the corresponding links from your deployment as noted in your terminal or AWS console for each Lambda function's corresponding API endpoint in API Gateway.
![Example](/images/Example.png)

## Author :key:
* **Eric Ng** - [EricNg314](https://github.com/EricNg314)

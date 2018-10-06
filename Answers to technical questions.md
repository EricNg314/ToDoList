# Answers to Technical Questions

### 1. How long did you spend on the coding test?
  * I spent roughly 13 hours. 
  * This was my first time working with AWS DynamoDB/Lambda, and still new to Serverless Framework. I thought it was the best way to respond based on prompt requirements.
<hr>

### 2. What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.
  * I would write more tests for validations, and learn more about serverless and DynamoDB. Both serverless and DynamoDB are new to me, so it took additional time setting up and understanding their functionality.
<hr>

### 3. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
  * I chose JavaScript, its async and await are amazing for tests.
  * By using async and await, I was able to run each api call and use a following function to modify or validate the same information in the database.
    ```
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
    ```
<hr>

### 4. How would you track down a performance issue in production? Have you ever had to do this?
  * Although I have never had to track performance issues, I used AWS CloudWatch to view logs and metrics on each of my Lambda functions.

<hr>

### 5. Please describe yourself using JSON.
```
{
  "name": "Eric Ng",
  "email": "hello@eric-ng.io",
  "education": [
    {
      "school": "San Francisco State University",
      "level": "Bachelor",
      "field": "Economics"
    },
    { "school": "UC Berkeley Extension",
      "level": "Certificate",
      "field": "Web Development"
    }
  ],
  "experience": [
    "Accounting Specialist",
    "Data Analytics Teaching Assistant"
  ],
  "languages": [
    "English", 
    "Javascript", 
    "Python", 
    "VBA", 
    "HTML", 
    "CSS",
    "SQL",
    "MongoDB"
  ],
  "random_facts": [
    {
      "favorite_language": "Javascript"
    },
    {
      "life_goal": "To save time by making things faster."
    },
    {
      "favorite_question": "What can you do that a computer can not?"
    },
    {
      "number_of_rubber_ducks_owned": 3
    },
    {
      "glasses": true
    },
    {
      "favorite_mouse": "Logitech G602"
    },
    {
      "internet_speed_preference": {
        "amount": 1073741824,
        "unit_type": "Bits"
      }
    },
    {
      "preferred_food": "pi"
    },
    {
      "number_of_whiteboards_owned": 3
    }
  ]
}
```



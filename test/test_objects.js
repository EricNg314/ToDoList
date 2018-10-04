const uuid = require('uuid');

module.exports.createData = {
  taskId: uuid.v1(),
  datePosted: Date.now(),
  status: "Incomplete",
  task: "My task."

}



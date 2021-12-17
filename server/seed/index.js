const {
  DB_CONNECTED,
  FAILED_SEED_EMPLOYEES,
  FAILED_SEED_TASKS,
  SEEDED_EMPLOYEES,
  SEEDED_TASKS
} = require('../constants/infoMessages');
const {
  formatDbConnectionErrorEmail,
  sendEmail
} = require('../services/emailService');
const { db: { DB_CONNECTION } } = require('../config');
const { format } = require('date-fns');
const faker = require('faker');
const Employee = require('../models/employee');
const logger = require('../winston');
const NUM_OF_EMPLOYEES = 100;
const NUM_OF_EMPLOYEE_TASKS = 10;
const mongoose = require('mongoose');
const Promise = require('bluebird');
const Task = require('../models/task');

mongoose.connect(DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    logger.info(DB_CONNECTED);
    mongoose.connection(DB_CONNECTION).Collection.drop('employees').then(() => {
      mongoose.connection(DB_CONNECTION).Collection.drop('tasks');
    });
  })
  .catch(err => {
    logger.log('fatal', `Problem with connection to DB. Error: ${err.message}` +
      ` Details: ${err.stack}`);
    sendEmail(formatDbConnectionErrorEmail(err));
  });
const employeesArr = [];
const tasksArr = [];

const getFakeData = () => {
  for (let i = 0; i < NUM_OF_EMPLOYEES; i++) {
    const employeeData = new Employee({
      _id: new mongoose.Types.ObjectId().toHexString(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(),
      age: faker.datatype.number({ min: 16, max: 70 }),
      pet: faker.animal.dog()
    });
    employeesArr.push(employeeData);
    for (let j = 0; j < NUM_OF_EMPLOYEE_TASKS; j++) {
      const taskData = new Task({
        name: faker.lorem.sentence(),
        employeeId: employeeData._id,
        deadline: format(faker.date.future(), 'yyyy-MM-dd'),
        completed: faker.datatype.boolean(),
      });
      tasksArr.push(taskData);
    }
  }
};
getFakeData();

Promise.each(employeesArr, emp => {
  emp.save();
})
  .then(() => logger.info(SEEDED_EMPLOYEES))
  .catch((error) => logger.error(`${FAILED_SEED_EMPLOYEES}: ${error.message}`));

Promise.each(tasksArr, task => {
  task.save();
})
  .then(() => logger.info(SEEDED_TASKS))
  .catch((error) => logger.error(`${FAILED_SEED_TASKS}: ${error.message}`));
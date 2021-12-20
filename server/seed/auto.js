const {
  SEEDED_EMPLOYEES,
  SEEDED_TASKS,
  SEEDING_FAILED,
  SEDDING_SUCCESS,
  SKIP_AUTOSEED,
  START_AUTOSEED
} = require('../constants/infoMessages');
const Employee = require('../models/employee');
const faker = require('faker');
const { format } = require('date-fns');
const logger = require('../winston');
const mongoose = require('mongoose');
const NUM_OF_EMPLOYEES = 100;
const NUM_OF_EMPLOYEE_TASKS = 4;
const Promise = require('bluebird');
const Task = require('../models/task');

const getFakeData = () => {
  const employees = [];
  const tasks = [];
  for (let i = 0; i < NUM_OF_EMPLOYEES; i++) {
    const employeeData = new Employee({
      _id: new mongoose.Types.ObjectId().toHexString(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(),
      age: faker.datatype.number({ min: 16, max: 70 }),
      pet: faker.animal.dog()
    });
    employees.push(employeeData);
    for (let j = 0; j < NUM_OF_EMPLOYEE_TASKS; j++) {
      const taskData = new Task({
        name: faker.lorem.sentence(),
        employeeId: employeeData._id,
        deadline: format(faker.date.future(), 'yyyy-MM-dd'),
        completed: faker.datatype.boolean(),
      });
      tasks.push(taskData);
    }
  }
  return { employees, tasks };
};

const getTimeElapsed = start => {
  return Math.round((Date.now() - start)/1000);
};

const seedDb = () => {
  const start = new Date();
  const { employees, tasks } = getFakeData();
  Promise.each(employees, emp => emp.save())
    .then(() => {
      logger.info(SEEDED_EMPLOYEES);
      return Promise.each(tasks, task => task.save())
        .then(() => {
          logger.info(SEEDED_TASKS);
          logger.info(SEDDING_SUCCESS);
        });
    })
    .catch(error => logger.error(`${SEEDING_FAILED}: ${error.message}`))
    .finally(() => {
      logger.info(`Seeding took ${getTimeElapsed(start)} seconds`);
    });
};

const autoseed = async () => {
  const count = await Employee.countDocuments();
  if (!count) {
    logger.info(START_AUTOSEED);
    seedDb();
  } else {
    logger.info(SKIP_AUTOSEED);
  }
};

module.exports = { autoseed, seedDb };
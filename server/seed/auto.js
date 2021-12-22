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
const Task = require('../models/task');

const createFakeEmployee = () => {
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();
  const employeeData = new Employee({
    _id: new mongoose.Types.ObjectId().toHexString(),
    name: firstName + ' ' + lastName,
    email: faker.internet.email(firstName, lastName),
    phone: faker.phone.phoneNumberFormat(),
    age: faker.datatype.number({ min: 16, max: 70 }),
    pet: faker.animal.dog()
  });
  return employeeData;
};

const createFakeTask = (employeeId) => {
  const taskData = new Task({
    name: faker.lorem.sentence(),
    employeeId: employeeId,
    deadline: format(faker.date.future(), 'yyyy-MM-dd'),
    completed: faker.datatype.boolean(),
  });
  return taskData;
};

const getFakeData = () => {
  const employees = [];
  const tasks = [];
  for (let i = 0; i < NUM_OF_EMPLOYEES; i++) {
    const employee = createFakeEmployee();
    employees.push(employee);
    for (let j = 0; j < NUM_OF_EMPLOYEE_TASKS; j++) {
      const task = createFakeTask(employee._id);
      tasks.push(task);
    }
  }
  return { employees, tasks };
};

const getTimeElapsed = start => {
  return Math.round((Date.now() - start) / 1000);
};

const seedDb = async () => {
  const start = new Date();
  try {
    const { employees, tasks } = getFakeData();
    await Employee.insertMany(employees);
    logger.info(SEEDED_EMPLOYEES);
    await Task.insertMany(tasks);
    logger.info(SEEDED_TASKS);
    logger.info(SEDDING_SUCCESS);
    logger.info(`Seeding took ${getTimeElapsed(start)} seconds`);
  } catch (error) {
    logger.error(`${SEEDING_FAILED}: ${error.message}`);
  }
};

const autoseed = async () => {
  try {
    const count = await Employee.countDocuments();
    if (!count) {
      logger.info(START_AUTOSEED);
      seedDb();
    } else { logger.info(SKIP_AUTOSEED); }
  } catch (error) { logger.error(`Autoseed failed. ${error.message}`); }
};

module.exports = { autoseed, seedDb };
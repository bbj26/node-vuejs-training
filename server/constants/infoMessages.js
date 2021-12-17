const EMPLOYEE_CREATED = 'Employee added successfully';
const EMPLOYEE_NOT_FOUND = 'Employee not found';
const EMPLOYEE_DELETED = 'Employee successfully deleted';

const TASK_CREATED = 'Task added successfully';
const TASK_NOT_FOUND = 'Task not found';
const TASK_DELETED = 'Task successfully deleted';
const TASK_DELETION_NOT_ALLOWED = 'Not allowed to delete task';
const TASK_UPDATED = 'Task successfully updated';

const ENVIRONMENT_VAR_UNDEFINED = '\nEnvironment variable not defined\n';

const DB_CONNECTED = 'Successfully connected to remote MongoDB.';

const SEEDED_EMPLOYEES = 'Database successfully seeded with fake employees data';
const SEEDED_TASKS = 'Database successfully seeded with fake task data';
const FAILED_SEED_EMPLOYEES = 'Could not seed database with fake employees';
const FAILED_SEED_TASKS = 'Could not seed database with fake tasks';

module.exports = {
  ENVIRONMENT_VAR_UNDEFINED,
  EMPLOYEE_CREATED,
  EMPLOYEE_NOT_FOUND,
  EMPLOYEE_DELETED,
  DB_CONNECTED,
  FAILED_SEED_EMPLOYEES,
  FAILED_SEED_TASKS,
  TASK_CREATED,
  TASK_NOT_FOUND,
  TASK_DELETED,
  TASK_DELETION_NOT_ALLOWED,
  TASK_UPDATED,
  SEEDED_EMPLOYEES,
  SEEDED_TASKS
};
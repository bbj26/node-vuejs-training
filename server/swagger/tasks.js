/**
 * @swagger
 * /tasks:
 *    get:
 *      summary: Returns the list of all tasks
 *      tags: [Tasks]
 *      responses:
 *        200:
 *          description: The list of the tasks
 *          content:
 *            - $ref: '#/components/content/task'
 *        404:
 *           description: Not found
 */

/**
 * @swagger
 *  /tasks/{id}:
 *    get:
 *      summary: Returns the list of specific employee's tasks
 *      tags: [Tasks]
 *      parameters:
 *        - $ref: '#/components/parameters/employeeID'
 *      responses:
 *        200:
 *          description: List of employee's tasks
 *        404:
 *          description: Not found
 */

/**
 * @swagger
 * /tasks/{id}:
 *    post:
 *      summary: Creates the new task
 *      tags: [Tasks]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      parameters:
 *        - $ref: '#/components/parameters/employeeID'
 *      responses:
 *        201:
 *          description: Task successfully created
 *          content:
 *            - $ref: '#/components/content/task'
 *        400:
 *          description: Express-validation error
 *        404:
 *          description: Server error
 *
 */

/**
 * @swagger
 * /tasks/complete/{id}:
 *    post:
 *      summary: Toggle task completion
 *      tags: [Tasks]
 *      parameters:
 *        - $ref: '#/components/parameters/taskID'
 *      responses:
 *        200:
 *          description: List of employee's tasks
 *        404:
 *          description: Not found
 */

/**
 * @swagger
 *  /tasks/{id}:
 *    delete:
 *      summary: Delete task by ID
 *      tags: [Tasks]
 *      parameters:
 *        - $ref: '#/components/parameters/taskID'
 *      responses:
 *        200:
 *          description: Task successfully deleted
 *        400:
 *          description: Bad ID error
 *        404:
 *          description: Not found
 */
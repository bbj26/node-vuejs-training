/**
 * @swagger
 * /tasks:
 *    get:
 *      summary: Returns the list of all tasks
 *      tags: [Tasks]
 *      responses:
 *        200:
 *           $ref: '#/components/responses/200FetchTasks'
 *        404:
 *           $ref: '#/components/responses/404TaskNotFound'
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
 *           $ref: '#/components/responses/200FetchTasks'
 *        404:
 *           $ref: '#/components/responses/404TaskNotFound'
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
 *              type: object
 *              properties:
 *                name: 
 *                  type: string
 *                  example: Make shopping list 
 *                deadline:
 *                  type: string
 *                  example: 2023-07-08
 *      parameters:
 *        - $ref: '#/components/parameters/employeeID'
 *      responses:
 *        201:
 *           $ref: '#/components/responses/201TaskCreation'
 *        400:
 *           $ref: '#/components/responses/400ValidationError'
 *        404:
 *           $ref: '#/components/responses/404TaskNotFound'
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
 *           $ref: '#/components/responses/200TaskUpdation'
 *        404:
 *           $ref: '#/components/responses/404TaskNotFound'
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
 *           $ref: '#/components/responses/200TaskDeletion'
 *        400:
 *           $ref: '#/components/responses/400ValidationError'
 *        404:
 *           $ref: '#/components/responses/404TaskNotFound'
 */
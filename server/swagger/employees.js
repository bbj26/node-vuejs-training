/**
 * @swagger
 * /employees:
 *    get:
 *      summary: Returns the list of all employees
 *      tags: [Employees]
 *      responses:
 *        200:
 *          $ref: '#/components/responses/200FetchEmployees'
 *        404:
 *           $ref: '#/components/responses/404EmployeNotFound'
 *    post:
 *      summary: Creates the new employee
 *      tags: [Employees]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name: 
 *                  type: string
 *                  example: John Doe
 *      responses:
 *        201:
 *          $ref: '#/components/responses/201EmployeeCreation'
 *        400:
 *           $ref: '#/components/responses/400ValidationError'
 *        409:
 *           $ref: '#/components/responses/409EmployeeCreation'
 *
 */

/**
 * @swagger
 *  /employees/{id}:
 *    delete:
 *      summary: Delete employee by ID
 *      tags: [Employees]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Employee ID
 *      responses:
 *        200:
 *           $ref: '#/components/responses/200EmployeeDeletion'
 *        400:
 *           $ref: '#/components/responses/400ValidationError'
 *        404:
 *           $ref: '#/components/responses/404EmployeNotFound'
 */
 
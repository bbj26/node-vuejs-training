/**
 * @swagger
 * /employees:
 *    get:
 *      summary: Returns the list of all employees
 *      tags: [Employees]
 *      responses:
 *        200:
 *          description: The list of the employees
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Employee'
 *        404:
 *           description: Not found
 *    post:
 *      summary: Creates the new employee
 *      tags: [Employees]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Employee'
 *      responses:
 *        201:
 *          description: Employee successfully created
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Employee'
 *        400:
 *          description: Express-validation error
 *        409:
 *          description: Server error
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
 *          description: Employee successfully deleted
 *        400:
 *          description: Bad ID error
 *        404:
 *          description: Not found
 */
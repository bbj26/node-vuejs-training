/**
 * @swagger
 * components:
 *  schemas:
 *    Employee:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated ID of the employee
 *        name:
 *          type: string
 *          description: Employee name
 *        createdAt:
 *          type: timestamp
 *          description: Creation timestamp
 *        updatedAt:
 *          type: timestamp
 *          description: Updation timestamp
 *      example:
 *        _id: 61aa33c659ded74313b379d9
 *        name: Stephen King
 *        createdAt: 2021-12-03T15:12:06.956Z
 *        updatedAt: 2021-12-03T15:12:06.956Z
 * 
 *    Task:
 *      type: object
 *      required:
 *        - name
 *        - employeeId
 *        - deadline
 *        - completed
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id of the task
 *        name:
 *          type: string
 *          description: Task name
 *        employeeId:
 *          type: string
 *          description: ID of the employee that the task is assigned to
 *        deadline:
 *          type: string
 *          description: Task deadline
 *        completed:
 *          type: boolean
 *          description: Task completion flag
 *        createdAt:
 *          type: timestamp
 *          description: Creation timestamp
 *        updatedAt:
 *          type: timestamp
 *          description: Updation timestamp
 *      example:
 *        _id: 61aa33c659ded74313b379d9
 *        name: Go shopping
 *        employeeId: 61aa33c659ded74313b37446
 *        deadline: 2021-12-07
 *        completed: false
 *        createdAt: 2021-12-03T15:12:06.956Z
 *        updatedAt: 2021-12-03T15:12:06.956Z
 * 
 *  parameters:
 *    employeeID:
 *      in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: Employee ID
 * 
 *    taskID:
 *      in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: Task ID
 *  
 *  content: 
 *    employee:
 *      application/json:
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Employee'
 * 
 *    task:
 *      application/json:
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Task'
*/

/**
 * @swagger
 * components:
 *    responses:
 *      404EmployeNotFound:  
 *        description: Employee not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                  example: 404
 *                error:     
 *                  type: string
 *                  example: 'Invalid ID'
 *      404TaskNotFound:
 *        description: Task not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                  example: 404
 *                msg:
 *                  type: string
 *                  example: 'Invalid ID'
 *      400ValidationError:
 *        description: Express validation error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                  example: 400
 *                error:
 *                  type: string
 *                  example: 'Name must be at least 2 characters long'
 *      200FetchEmployees:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Employee'
 *              example: [
 *                        {
 *                          "_id": "61af2318fa94fd876ff9bba2",
 *                          "name": "John Doe",
 *                          "createdAt": "2021-12-07T09:02:16.355Z",
 *                          "updatedAt": "2021-12-07T09:02:16.355Z",
 *                           "__v": 0
 *                         },
 *                         {
 *                          "_id": "61af231afa94fd876ff9bba5",
 *                          "name": "Jane Doe",
 *                          "createdAt": "2021-12-07T09:02:18.004Z",
 *                          "updatedAt": "2021-12-07T09:02:18.004Z",
 *                          "__v": 0
 *                         }
 *                        ]
 *      201EmployeeCreation:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                  example: 201
 *                msg:
 *                  type: string
 *                  example: 'Employee successfully created'
 *                saved:
 *                  type: object
 *                  example: {
 *                          "_id": "61af231afa94fd876ff9bba5",
 *                          "name": "Jane Doe",
 *                          "createdAt": "2021-12-07T09:02:18.004Z",
 *                          "updatedAt": "2021-12-07T09:02:18.004Z",
 *                          "__v": 0
 *                         }    
 *      200EmployeeDeletion:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                  example: 201
 *                msg:
 *                  type: string
 *                  example: 'Employee successfully deleted'
 *      409EmployeeCreation:
 *        description: Failed request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                  example: 409
 *                msg:
 *                  type: string
 *                  example: 'Server down'
*/
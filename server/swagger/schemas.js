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
*/

/**
 * @swagger
 * tags:
 *    - name: Employees
 *      description: The employees managing API
 *    - name: Tasks
 *      description: The tasks managing API
*/
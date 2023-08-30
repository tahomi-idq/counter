Create image of app:

>sudo docker build . -t counter

Launch image:

>sudo docker run -p 3030:3030 -p 3333:3333 counter

------------------------------------------------------------

Database used: MongoDb

Technical task:

Create an express app + UI with the following capabilities

- Endpoint for user authentication using login and password (or single secret string for simplicity). Should respond with JWT token. There is no restrictions of how users are implemented - they can be in the DB, hardcoded, or populated using some faker.

- the system should contain at least 2 different users with different permissions

- Endpoint:
- to get the current value of the counter (read operation, counter:read)
- for incrementing the counter (write operation, counter:incr)
- for decrementing the counter (write operation, counter:decr)
- (bonus) to get historical values of the counter

All endpoints should check for read / write permissions of the user and don't allow to apply the action if permissions are not assigned.

Every minute, the counter value should be stored in the DB and the actual value should be set to 0. If the counter value is 0, do not store it in the DB.
The DB should contain info about: counter value and time when it was recorded

The simple frontend should:
- authenticate the user in the most simple way, can be even prompt() function
- show the current counter value
- 2 buttons for incrementing and decrementing the counter
- (bonus task) load historical results of the counter and display then

Requirements for implementation:
- Use ExpressJs and React (optionally) to build the app. Alternatively, the frontend side can be built using http://vanilla-js.com
- For simplicity, Applications can be packaged as a single project.
- Database choice is not restricted (SQL, no-SQL, redis, or even files). The only requirement is that after the application restarted, historical values should be still in the system

Requirements for completion
- application should be packaged using .zip archive (excluding node_modules)
- small documentation how to run the app and what credentials use to authenticate users

Create image of app:

>sudo docker build . -t counter

Launch image:

>sudo docker run -p 3030:3030 -p 3333:3333 counter

------------------------------------------------------------

Database used: MongoDb
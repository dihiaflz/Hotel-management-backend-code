# HOTEL MANAGEMENT BACKEND CODE
Backend code repository for a hotel management website admin panel. Includes functionality for staff management, room listing with availability status, client booking management, and other essential admin panel operations, incorporating robust security measures. Utilizes JWT (JSON Web Tokens) for authentication, ensuring secure access to sensitive information. Implements comprehensive error handling mechanisms to maintain system stability and reliability .

# HOW TO USE :
1. Clone the repository to your local machine.
2. Run the command **npm install** to install all the project's dependencies
3. Create in the project's root directory a .env file
4. Create a new database in mongodb and find the link to connect your db ( sign in in mongodb website => database => connect => mongodb for vs code )
5. Fill out the **.env** file with the following informations : DATABASE_URI= the link to use your db, SECRET= the secret for your jwt token, it can be any word you want but you should keep it a secret
6. Run the code using the command **npm start** and everything will work properly .
   **PS :** you will notice that we have two authMiddleware files, one for the app version and the other for the web because many app developers send the jwt token in the request's body and not on the headers => the auth middleware's logic will change  
GOOD LUCK !
 






# booksLibraryBack
A backend for library, manage books, users, and loans.

there are three main route:
/books for manage (CRUD) books
/users for manage (CRUD) users
/loans from manage loan and return books

Since I didn’t implement authentication or identification, but I want to use a similar mechanism,
every request to the server should include an idNumber in the authorization header 
(similar to how JWT is used in real applications).
Of course, this is not ideal from a cybersecurity standpoint, but it is just to simulate a real authentication mechanism

Although it may seem odd that all the URLs under /users are not protected,
allowing anyone to create a user with employee privileges, this is intentional.
I want the app to be easy to test. I could create an admin user when the app starts, but that would make it harder to run and test the app.

I couldn't find a good option to add schema through code without using mongosh 

I add a postman folder with example to some request so it's will be easy to check.

How to run the app:
1. make sure you have mongo instance run, and please update the address of the mongo at the .env file under the variable library_host
2. run "npm i" at the main folder (where the packages.json)
3. run "npm run build" at the main folder (where the packages.json)
4. run "npm run start" at the main folder (where the packages.json)


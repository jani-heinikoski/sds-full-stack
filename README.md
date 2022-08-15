
# SDS: Full Stack 2022

This is a code repository which contains everything required for passing the LUT course CT70A9140 Software Development Skills: Full-Stack.


## Learning diary

The learning diary (*learning-diary.docx*) required for passing the course can be found in the repository's root.

## Version information

Software versions used during the course (see the *package.json* files under each module for specific Node package version information):
* Angular CLI: 14.1.0
* Node: 16.16.0
* Package Manager: npm 8.11.0
* MongoDB: 5.0.3
* OS: Windows 10 Home x86-64

## Coursework

All of the projects developed during the coursework modules can be found under */coursework*.

## Project

The course project can be found under */project*.
Idea for the course project was to create a full stack web application for restaurants on top of the MEAN-stack.
The application is intended to be a basic template that can be customized on demand for potential customers.
The project is based on the application developed in the *MEAN-stack* coursework module.
All commits starting with *project:* are related to the course project.

#### Features

The project has the following features (and much more):
* Secure JWT authentication and authorization implemented with [Passport](https://www.passportjs.org/) (specifically using the [passport-jwt](http://www.passportjs.org/packages/passport-jwt/) strategy).
* Easily customizable menu and opening hours; when the application is tailored for the customer, they are given access to an administrator account which can be used to customize the menu and opening hours. Note: customer should change the admin account credentials.

#### Installation and usage

To install the project, first ensure that you meet the requirements specified in the above version information chapter.
1. Clone the contents of this repository to a directory of your choice.
2. Open up a terminal/CMD and execute the following commands
```
cd <repository-directory>/project/restaurant-app
npm install
cd angular-frontend
npm install
ng build
```
3. To start the application
    * Create a file called .env in the `<repository-directory>/project/restaurant-app` directory. The key-value pairs in this file are loaded into environment variables when the application starts. You may also set the environment variables directly as you see fit. You can modify the application with the following environment variables:
        * `MONGO_URL` - Connection string to the MongoDB database which the application uses.
        * `SECRET` - Secret key used to generate JWT tokens. Do not share this key with anyone.
        * `PORT` - The backend HTTP listens to `PORT` (default 3000). Note: if you change the port from the default 3000, change it also in the BaseURL service of the Angular frontend and build the frontend again by running the `ng build` command in the `/project/restaurant-app/angular-frontend` directory.
        * `ADMIN_USERNAME` - The default admin account username which is created when the backend is started for the first time (default admin).
        * `ADMIN_PWD` - The default admin account password which is created when the backend is started for the first time (default password).
    * Run `npm start` in the `<repository-directory>/project/restaurant-app` directory.
    
After starting the application for the first time you should get the following response in your command line:
```
Connected successfully to <MONGO_URL>
Did not find any opening hours, creating...
Initialized opening hours
No users found, creating default admin...
Initialized admin user
Server started on port <PORT>
```
An example .env file:
```
MONGO_URL=mongodb://localhost:27017/restaurant-app-test
SECRET=my_super_secret_key
PORT=3200
ADMIN_USERNAME=username
ADMIN_PWD=pwd
```

4. How to modify the opening hours / menu / admin credentials
   * First login to the administrator account by: 1. navigating to the login screen by clicking the login button on the application's top navigation bar 2. entering the credentials into the login form 3. clicking the login button.
   * After you have logged in as the administrator, you can:
      * navigate to the home page and scroll to the bottom of the page to modify opening hours.
      * navigate to the menu page and scroll to the bottom of the page to modify the menu.
      * navigate to the change credentials page to change the admin account's login credentials.

# Todo Microfrontend

## Overview

This project is a microfrontend (MFE) that implements a Todo List application using React and TypeScript. The MFE can be integrated into any host application using Webpack 5 Module Federation.

## Setup Instructions

### Setup MFE Todo list App

1. Clone the repository.
2. Navigate to the `ToDoApp` directory.
3. Install the dependencies:
   `npm install`
4. Run the App
   `npm run start`
5. In browser navigate to `http://localhost:5037` to see the app without host app.

6. Run unit tests the APP
   `npm run test`

### Setup Host App

1. Clone the repository.
2. Navigate to the `host` directory.
3. Install the dependencies:
   `npm install`
4. Run the App
   `npm run start`
5. Make sure that MFE Todo list App is running as well on 5037 port.
6. In browser navigate to `http://localhost:5038` to see the host app with TODO list integrated as a MFE.

## Design and Architectural Choices

**TypeScript:** Used for type safety and maintainability.
**React:** Used for building the user interface.
**Tailwing:** Used for simple styling
**Module Federation:** Used to enable the MFE to be integrated into a host application.
**LocalStorage:** Used to persist todo items across page refreshes and sessions.
**Component-based Architecture:** The application is divided into small, reusable components.
**Error Handling:** LocalStorage errors and validation are handled gracefully
**Unit Testing:** Unit testing done with react-testing, jest frameworks
**Eslint:** Eslint is implemented to make sure code quality

## Microfrontend Architecture

For microfrontend integration Module Federation plagin is selected.

webpack.config.js:

```
...
exposes: {
        "./TodoApp": "./src/components/TodoMain",
      },
...
```

To test microfrontend integration in a host app it should have Module Federation plagin installed.
In the webpack.config.js of the host app use the following:

```
...
filename: "remoteEntry.js",
remotes: {
todo: "todo@http://localhost:5037/remoteEntry.js",
},
...
```
In the host app import the MFE:

```
import TodoApp from "todo/TodoApp";
```
Now use `<TodoApp />` to render.




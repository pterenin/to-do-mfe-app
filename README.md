# Todo Microfrontend

## Overview

This project is a Host App to integrate a microfrontend (MFE) using Webpack Modal Federation. This APP has limited functionality and created only to test MFE integration

## Setup Instructions

1. Clone the repository.
2. Navigate to the `host` directory.
3. Install the dependencies:
   `npm install`
4. Run the App
   `npm run start`
5. Run MFE app on 5037 port
   Follow instruction in MFE README.md
6. In browser navigate to `http://localhost:5038` to see the app with TODO list integrated as a MFE.

## Design and Architectural Choices

TypeScript: Used for type safety and maintainability.
React: Used for building the user interface.
Module Federation: Used to enable the MFE to be integrated into a host application.
LocalStorage: Used to persist todo items across page refreshes and sessions.
Component-based Architecture: The application is divided into small, reusable components.
Error Handling: LocalStorage errors and validation are handled gracefully
Unit Testing: Unit testing done with react-testing, jest frameworks

## Microfrontend Architecture

For microfrontend integration Module Federation plagin is selected.

webpack.config.js:

`````
...
exposes: {
        "./TodoApp": "./src/components/TodoMain",
      },
...
````
To test microfrontend integration in a host app it should have Module Federation plagin installed.
In the webpack.config.js of the host app use the following:

```

filename: "remoteEntry.js",
remotes: {
todo: "todo@http://localhost:5037/remoteEntry.js",
},
```
In the host app import the MFE:
```
import TodoApp from "todo/TodoApp";
```
Now use `<TodoApp />` to render.
`````

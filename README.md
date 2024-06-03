# Todo Microfrontend

## Overview

This project is a microfrontend (MFE) that implements a Todo List application using React and TypeScript. The MFE can be integrated into any host application using Webpack 5 Module Federation.

## Setup Instructions

#### 1. Clone the repository.

`git clone https://github.com/pterenin/to-do-mfe-app.git`
Two subfolders will be availible:

- **ToDoApp** - Microdrontend Todo App
- **host** - Host app to test MFE integration

#### 2. Setup MFE Todo list App

1. Navigate to the `ToDoApp` directory.
2. Install the dependencies:
   `npm install`
3. Run the App
   `npm run start`
4. In browser navigate to `http://localhost:5037` to see the app without host app.

5. Run unit tests the APP
   `npm run test`

#### 3. Setup Host App

1. Navigate to the `host` directory.
2. Install the dependencies:
   `npm install`
3. Run the App
   `npm run start`
4. Make sure that MFE Todo list App is running as well on 5037 port.
5. In browser navigate to `http://localhost:5038` to see the host app with TODO list integrated as a MFE.

#### Result:

<img width="921" alt="Screenshot 2024-06-02 at 2 51 36 PM" src="https://github.com/pterenin/to-do-mfe-app/assets/17990616/c6e9c60d-80c4-4336-8b6a-4b892f55b4c6">

#### Error Handeling (MFE failed to load or render):

<img width="909" alt="Screenshot 2024-06-03 at 9 14 14 AM" src="https://github.com/pterenin/to-do-mfe-app/assets/17990616/eea7ccec-3715-4145-a60b-97bfe73444bf">

## Design and Architectural Choices

- **TypeScript:** Used for type safety and maintainability.
- **React:** Used for building the user interface.
- **Tailwing:** Used for simple styling
- **Module Federation:** Used to enable the MFE to be integrated into a host application.
- **LocalStorage:** Used to persist todo items across page refreshes and sessions.
- **Component-based Architecture:** The application is divided into small, reusable components.
- **Error Handling:** LocalStorage errors and validation are handled gracefully
- **Unit Testing:** Unit testing done with react-testing, jest frameworks
- **Eslint:** Eslint is implemented to make sure code quality

## Microfrontend Architecture

#### Microfrontend TodoApp

For microfrontend integration **Webpack Module Federation** plagin is used.

webpack.config.js:

```
...
exposes: {
        "./TodoApp": "./src/components/TodoMain",
      },
...
```

#### Host App

To test microfrontend integration in a host app it should have **Webpack Module Federation** plagin installed.
In the `webpack.config.js` of the host app use the following:

webpack.config.js

```
...
filename: "remoteEntry.js",
remotes: {
todo: "todo@http://localhost:5037/remoteEntry.js",
},
...
```

In the host app **TodoAppLoader** component is used to load the Todo MFE.
This component uses `React.lazy` to dynamically import the TodoApp microfrontend and handle errors during the import process.

```
const TodoApp = lazy(() =>
  import("todo/TodoApp").catch(() => ({
    default: () => ErrorText,
  }))
);
```

It uses `ErrorBoundary` to catch render errors.
It uses `Suspense` to provide a loading state while the microfrontend is being loaded.

```
  <ErrorBoundary fallback={ErrorText}>
      <Suspense fallback={<p className="text-center">Loading ToDoApp...</p>}>
        <TodoApp />
      </Suspense>
    </ErrorBoundary>
```

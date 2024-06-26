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

- **TypeScript:** Used for type safety and maintainability.
- **React:** Used for building the user interface.
- **Tailwing:** Used for simple styling
- **Module Federation:** Used to enable the MFE to be integrated into a host application.
- **Component-based Architecture:** The application is divided into small, reusable components.

## Microfrontend Architecture

For microfrontend integration Module Federation plagin is used.

webpack.config.js in MFE app:

```
...
exposes: {
        "./TodoApp": "./src/components/TodoMain",
      },
...
```

webpack.config.js in the host app

```
...
filename: "remoteEntry.js",
remotes: {
todo: "todo@http://localhost:5037/remoteEntry.js",
},
...
```

In the host app **TodoAppLoader** component is used to load the Todo MFE.
This component tries to load the Todo MFE with `React.lazy` to dynamically import the TodoApp microfrontend and handle errors during the import process.

```
const TodoApp = lazy(() =>
  import("todo/TodoApp").catch(() => ({
    default: () => ErrorText,
  }))
);
```

It uses `ErrorBoundary` to catch render errors
It uses `Suspense` to provide a loading state while the microfrontend is being loaded.

```
  <ErrorBoundary fallback={ErrorText}>
      <Suspense fallback={<p className="text-center">Loading ToDoApp...</p>}>
        <TodoApp />
      </Suspense>
    </ErrorBoundary>
```

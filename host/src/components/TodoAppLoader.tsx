import React, { Suspense, lazy } from "react";
import ErrorBoundary from "./ErrorBoundary";

const ErrorText = (
  <div className="text-amber-600 text-center p-4">
    TodoApp is currently unavailable.
    <br />
    <br />
    Make sure that the server hosting the TodoApp microfrontend is running and
    accessible at http://localhost:5037
  </div>
);
// Lazy load the TodoApp microfrontend
const TodoApp = lazy(() =>
  import("todo/TodoApp").catch(() => ({
    default: () => ErrorText,
  }))
);

const TodoAppLoader = () => {
  return (
    <ErrorBoundary fallback={ErrorText}>
      <Suspense fallback={<p className="text-center">Loading ToDoApp...</p>}>
        <TodoApp />
      </Suspense>
    </ErrorBoundary>
  );
};

export default TodoAppLoader;

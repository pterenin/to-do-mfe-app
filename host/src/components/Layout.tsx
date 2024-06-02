import React from "react";
import Header from "./Header";

import TodoApp from "todo/TodoApp"; // import Micro Frontend ToDoMain

const Layout = () => {
  return (
    <>
      <Header />
      <p className="m-auto items-center max-w-3xl pl-0 p-4">Host App Content</p>
      <TodoApp />
    </>
  );
};

export default Layout;

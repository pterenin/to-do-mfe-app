import React from "react";
import Header from "./Header";
import TodoAppLoader from "./TodoAppLoader";

const HostApp = () => {
  return (
    <>
      <Header />
      <p className="m-auto items-center max-w-3xl pl-0 p-4">Host App Content</p>
      <TodoAppLoader />
    </>
  );
};

export default HostApp;
